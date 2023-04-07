import { useState } from "react";
import server from "./server";
import { Signature } from "ethereum-cryptography/secp256k1";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        signature: signature,
        recoveryBit: parseInt(recoveryBit),
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Signature
        <input
          placeholder="Please sign the transaction to validate its you"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>
      <label>
        Recovery Bit
        <input
          placeholder="Please give a valid recovery bit"
          value={recoveryBit}
          onChange={setValue(setRecoveryBit)}
        ></input>
      </label>
      <label>
        Send Amount
        <input
          placeholder="1, 2, 3... This is also your transaction msg"
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type reciever address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
