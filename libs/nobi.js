const { ethers } = require('ethers')

const apiResponse = function (message, code = 200, data) {
    let res = { code: code, message: message, errors: data }

    if (code == 200) {
        delete res.errors
        res.data = data
    }

    return res
}

const getBalance = async function (itx, signer) {
    let response = await itx.send('relay_getBalance', [signer.address])
    console.log(`Your current ITX balance is ${response.balance}`, response)
}

const deposit = async function (signer, address, amount) {
    const tx = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseUnits(amount, 'ether')
    })
    console.log('Mining deposit transaction...\n', tx);
    let hashUrl = `https://ropsten.etherscan.io/tx/${tx.hash}`
    const receipt = await tx.wait();
    console.log(`Mined in block ${receipt.blockNumber}`);

    return {
        url: hashUrl,
        txId: tx.hash
    }
}

module.exports = {
    apiResponse,
    getBalance,
    deposit
}