const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

// This piece of code is randomly generating private keys, their corresponding public key and address
const privateKey = secp.utils.randomPrivateKey();
console.log('privatekey is :', toHex(privateKey));
const publicKey = secp.getPublicKey(privateKey);
console.log('publicKey is :', toHex(publicKey));
const address = toHex(keccak256(publicKey.slice(1)).slice(20));
console.log('address is :', address);


