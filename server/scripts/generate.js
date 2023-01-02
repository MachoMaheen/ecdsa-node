const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const privateKey=secp.utils.randomPrivateKey();
console.log('Private Key:',toHex(privateKey));//toHex() is used to convert the byte array into a readable hexadecimal number
const publicKey=secp.getPublicKey(privateKey);
console.log('Public Key:',toHex(publicKey));//toHex() is used to convert the byte array into a readable hexadecimal number

