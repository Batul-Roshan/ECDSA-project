const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
// Here we are hardcoding our private key and the transaction msg along with recovery bit to generate our signature 
// For future: this could be further developed as an offline app to help indiviuals generate their digital signatures
// For different set of test cases please pick private keys from keys.txt or generate new ones from generateprivatekey.js and verify
const privateKey = '29967da5d6b022a83dfd461e6f27f4bc1d2316ea34f7a07192363b89bc014472'; //Alice's private key
const hashKey = keccak256(utf8ToBytes('50')); //transaction amount AKA message
const recoveryBit = 1;

async function getSignature() {
    const signature = await secp.sign(hashKey, privateKey);
    console.log(toHex(signature));
    const publicKey = secp.recoverPublicKey(hashKey, signature, recoveryBit);
    console.log(toHex(publicKey));
    console.log(signature.length);
}
getSignature();



//This signature is generated for the private key hardcoded above with transaction 50 and recovery bit 1:
//304402200f2c7dc4567085e742a54aef682d03fd7b4f6d35fa67f1919996a9f7aa6be98d02207c09feeb7f404d1c0f173092b59cc3569fbd6dd6f3bbcdce7a4d574c92294ca5
