import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, user, setUser }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(keccak256(secp.getPublicKey(privateKey).slice(1)).slice(20));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    }

    else {
      setBalance(0);
    }
    if (address) {
      const {
        data: { user },
      } = await server.get(`user/${address}`);
      setUser(user);
    }
    else {
      setUser(null);
    }

  }


  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        PrivateKey
        <input placeholder="Type your privateKey, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="address">
        ADDRESS : {address}
      </div>


      <div className="balance">Balance: {balance}</div>
      <div className="user">
        Hello  {user} ! Welcome Back
      </div>


    </div>

  );
}

export default Wallet;
