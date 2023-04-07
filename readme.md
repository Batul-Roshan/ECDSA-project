ECDSA-Node
This project allows clients to transfer funds between accounts by using the correct private key and digital signature for verification. The digital signature serves as a way for the server to confirm the transaction and transfer funds between accounts.

Client-side functionality
The user inputs their private key, which is converted to the appropriate address. This address is then sent to the server to fetch the client's name and wallet balance. In addition to the recipient's address, the client needs to input a valid signature, recovery bit, and transaction amount in order to make a transfer.

Server-side functionality
The server receives the sender's signature, recovery bit, and transaction amount. It uses this information to recover the sender's public key and corresponding address. The server then validates if the recovered address matches that of the sender. If the validation is successful, the transaction is completed and the balances in both the sender and recipient wallets are updated. If the validation fails, the sender is not allowed to make the transaction.
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
