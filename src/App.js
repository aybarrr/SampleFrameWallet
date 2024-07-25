
import React, { useEffect, useState } from 'react';
import './App.css'; 
import { EvmConnectorUI} from 'evm-connector-reframe'

function App() {
const tg = window.Telegram.WebApp;
 tg.ready();
  const [addres, setAdres] = useState('');
  const [amount, setAmount] = useState('');
  const [evmWallet, setEvmWallet] = useState(null);
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [tokenRecipient, setTokenRecipient] = useState('');
  const [selectedChain, setSelectedChain] = useState('Ethereum');

  useEffect(() => {
    const ui_evm = new EvmConnectorUI({
      buttonId: 'connect-wallet',
      successTxClb:  (hash)=>{
              alert('Transaction successful: '+ hash)
          }
      })
      setEvmWallet(ui_evm);
   }, []); 

   const simpleSend = async () => {
    evmWallet.transferNative(addres, amount)
   }

   const erc20Send = async () => {
    evmWallet.transferToken(tokenAddress, addres, tokenAmount)
   }

    const handleChainChange = (e) => {
      setSelectedChain(e.target.value);
    }

  return (
    <div className="app">
      <div className="wallet-container">
        <div className="logo-container">
          <img src="base-logo.png" alt="Chain Logo" className="chain-logo" />
        </div>
     
        <h1 className="title">Frame Wallet Sample</h1>
        <p className="subtitle">Connect your Frame Wallet:</p>
        <button className="connect-button" id='connect-wallet'>Connect Wallet</button>
        <div className="send-eth-container">
          <p className="send-eth-title">Send ETH:</p>
          <input type="text" placeholder="Address" onChange={(e)=>setAdres(e.target.value)} className="input-field" />
          <input type="text" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} className="input-field" />
          <button className="send-button" onClick={simpleSend}>Send</button>
        </div>
        <div className="send-eth-container">
          <p className="send-eth-title">Send ERC20 Token on the selected chain:</p>
          <div>
        <select value={selectedChain} onChange={handleChainChange}>
        <option value="Ethereum">Ethereum</option>
        <option value="Binance Smart Chain">Binance Smart Chain</option>
        <option value="Base">Base</option>
        <option value="Polygon">Polygon</option>
        <option value="Arbitrum">Arbitrum</option>
      </select>
        </div>
          <input type="text" placeholder="Token Address" onChange={(e)=>setTokenAddress(e.target.value)} className="input-field" />
          <input type="text" placeholder="Recipient Address" onChange={(e)=>setTokenRecipient(e.target.value)} className="input-field" />
          <input type="text" placeholder="Amount" onChange={(e) => setTokenAmount(e.target.value)} className="input-field" />
          <button className="send-button" onClick={erc20Send}>Send ERC20</button>
        </div>
      </div>
    </div>
  );
}

export default App;
