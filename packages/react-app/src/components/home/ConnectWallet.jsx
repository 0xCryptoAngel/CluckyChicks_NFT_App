import { Button } from "antd";
import React from "react";
import './style.css';
import Address from "./Address"


export default function ConnectWallet({
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  contract, signer, remainTokenCount
}) {

  const accountEllipsis = address ? `${address.substring(0, 5)}...${address.substring(address.length - 3)}` : null;

  const modalButtons = [];
  if (web3Modal) {
    console.log(web3Modal.cachedProvider)
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button
          key="logoutbutton"
          style={{ 
            verticalAlign: "top",
            backgroundColor: 'black',
            borderRadius: "100px",
            color: "#ffe14b",
            fontSize: "20px",
            fontFamily: "Titan One, Sans-serif",
            padding: "8px 30px",
            cursor: 'pointer',
            height: '45px',
            border: 'none'
          }}
          className="connect_status light"
          onClick={logoutOfWeb3Modal}
        >
          DISCONNECT  <Address size="short" address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />
        </Button>,
      );
    } else {
      modalButtons.push(
        <Button
          key="loginbutton"
          style={{ 
            verticalAlign: "top",
            backgroundColor: 'black',
            borderRadius: "100px",
            color: "#ffe14b",
            fontSize: "20px",
            fontFamily: "Titan One, Sans-serif",
            padding: "8px 30px",
            cursor: 'pointer',
            height: '45px',
            border: 'none'
          }}
          onClick={loadWeb3Modal}
          className="connect_status dark"
        >
        CONNECT WALLET
        </Button>,
      );
    }
  }

  return (
    <div>
      {modalButtons}
    </div>
  );
}
