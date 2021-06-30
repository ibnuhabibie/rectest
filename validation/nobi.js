const { check, query } = require('express-validator')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('nobiTest')

const wallet = [
    query('source_address').not().isEmpty(),
    query('private_key').custom(value => {
        if (!value) {
            throw new Error('Invalid value');
        }

        const decryptedString = cryptr.decrypt(value);
        console.log(decryptedString, value, 'asdasd')

        if (decryptedString == null) {
            throw new Error('Invalid value - cannot be decrypted');
        }

        return true
    }),
    query('destination_address').not().isEmpty()
]

module.exports = {
    wallet
};