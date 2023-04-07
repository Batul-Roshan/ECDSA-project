const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");


app.use(cors());
app.use(express.json());

const balances = {
  "ce7d88d14b4535837ea2fead": 100, //Alice
  "9bc876d6dc2cdf18edd3e14c": 50, //Bob
  "53e274bd5b51df69d765dc09": 75, //Clara
};
const users = {
  "ce7d88d14b4535837ea2fead": "Alice",
  "9bc876d6dc2cdf18edd3e14c": "Bob",
  "53e274bd5b51df69d765dc09": "Clara",
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/user/:address", (req, res) => {
  const { address } = req.params;
  const user = users[address] || 0;
  res.send({ user });
});

app.post("/send", (req, res) => {
  //Getting a signature, recovery bit and a transaction msg from client side application
  //recovering public key and address from the signature authenticating the sender 

  const { sender, signature, recoveryBit, recipient, amount } = req.body;

  const hashKey = keccak256(utf8ToBytes(amount.toString())); //here our transaction amount is the msg that is hashed and send with private key to generate signatures
  const publicKey = secp.recoverPublicKey(hashKey, signature, recoveryBit);
  const recoveredAddress = toHex(keccak256(publicKey.slice(1)).slice(20));


  if (recoveredAddress == sender) {
    setInitialBalance(sender);
    setInitialBalance(recipient);
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });

    }
  }
  else { // this part is getting trigged when ever the recovery bit and/or transaction amount are not matching
    res.status(400).send({ message: "You are not authenticated to make the transfer" });
  }

});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
