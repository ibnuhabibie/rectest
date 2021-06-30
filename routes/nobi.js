const express = require('express')
const Cryptr = require('cryptr')
const { ethers } = require('ethers')

const { validationResult } = require('express-validator')
const { apiResponse, getBalance, deposit } = require('../libs/nobi')
const { wallet } = require('../validation/nobi')
const cryptr = new Cryptr('nobiTest')
const router = express.Router()

const PRIVATE_KEY = '0xc39418a7f8d33098dcade56968710ffd43da3a8b9b7e1231b0ad6a19160ef62f'
const PROJECT_ID = '5ef3f84db4104ec5b4b5f13c1712098a'
// const DEST_ADDRESS = '0x35acb73027f731079d64bdb380477370834790c1'

router.get('/', wallet, async (req, res) => {
    const validation = validationResult(req);

    if (validation.errors.length) {
        return res.status(422).json(apiResponse('Validation Error', 422, validation.errors))
    }

    const itx = new ethers.providers.InfuraProvider('ropsten', PROJECT_ID)

    let privateKey = cryptr.decrypt(req.query.private_key)
    const signer = new ethers.Wallet(privateKey, itx)

    let result = await deposit(signer, req.query.destination_address, '0.1')
    await getBalance(itx, signer);

    return res.json(
        apiResponse('Successfully send transaction', 200, result)
    )
})

router.get('/encrypt', wallet, (req, res) => {
    res.send(cryptr.encrypt(PRIVATE_KEY))
});

module.exports = router