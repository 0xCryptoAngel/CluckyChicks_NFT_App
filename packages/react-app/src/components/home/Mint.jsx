import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Modal, Button, Checkbox } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseEther } from "@ethersproject/units";
import { ETH_VAL } from "../../constants";
import './style.css';

export default function Mint({
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
  contract,
  signer,
  remainTokenCount
}) {

  const [amount, setAmount] = useState(ETH_VAL);
  const [minting, setMinting] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [mintCount, setMintCount] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [termchecked, setTermChecked] = useState(false);

  const serverUrl = "https://clucky-chicks-referrals.onrender.com/add?"

  const axios = require('axios');

  const sendReq = async(address = "", mintCount = 0, referral = "") => {
    const url = serverUrl + "address=" + address + "&mintCount=" + mintCount  + "&referral=" + referral ;
    console.log("server request starte" + url);
    axios.get(url)
    .then(response => {
      console.log("log to server is successed!")
    })
    .catch(error => {
      console.log(error);
      sendReq(address, mintCount, referral);
    });
  }

  const notify_warn = (message) => toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  const notify_success = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const _decreaseMintCount = () => {
    if (mintCount == 1) return;
    setMintCount(mintCount - 1);
  };

  const _increaseMintCount = () => {
    if (mintCount == 20) return;
    setMintCount(mintCount + 1);
  };

  const mintNftHandler = async () => {

    setModalVisible(false)
    setMinting(true);
    try {
      const mintFunction = contract["Chicks"].connect(signer)["mint"];
      const hash = await mintFunction(address, mintCount, {
        value: parseEther((amount * mintCount).toString()),
      });
      await hash.wait();
      setMinting(false);
      console.log("referral code -- " + referral + " -- address -- " + address + " -- mint count -- " + mintCount);
      sendReq(address, mintCount, referral);
      notify_success(mintCount + " NFT(s) minted.");
    } catch (e) {
      var errormsg = e.error.message ? e.error.message : "Mint Failed.";
      if(errormsg.indexOf("insufficient funds") != -1)          errormsg = "Insufficient funds, Not enough ETH";
      if(errormsg.indexOf("whitelisted") != -1)                 errormsg = "User is not whitelisted";  
      if(errormsg.indexOf("Mint is paused") != -1)              errormsg = "Mint is paused";
      if(errormsg.indexOf("Recipient should be present") != -1) errormsg = "Recipient should be present";
      if(errormsg.indexOf("Need to mint at least 1 NFT") != -1) errormsg = "Need to mint at least 1 NFT";
      if(errormsg.indexOf("Royalty value should be positive") != -1)      errormsg = "Royalty value should be positive";
      if(errormsg.indexOf("Max mint amount per session exceeded") != -1)  errormsg = "Max mint amount per session exceeded";
      notify_warn(errormsg);
      setMinting(false);
      console.log(e);
    }
  };

  const [referral, setReferral] = useState("");

  const setReferralCode = (evt) => {
    setReferral(evt.target.value);
  }

  return (
    <div className="mintContainer" id="mintContainer">
      <div className="mint-title">
        {/* <p className="mintTitle">MINTING - APR 2022</p> */}
        <p className="mintTitle">Mint your Clucky Chick</p>
        <p className="mintSubtitle">CLUCKY CHICKS COST 0.03ETH.</p>
        {!web3Modal.cachedProvider && (<p className="mintSubtitle1"> CONNECT TO THE ETHEREUM NETWORK.</p>)}
      </div>
      <Modal
        visible={modalVisible}
        title="TERMS OF SERVICE"
        centered
        footer={[
          <Button key="submit" disabled={!termchecked} onClick={() => setModalVisible(false)} style={{backgroundColor: termchecked ? 'black': 'grey', color: '#ffe14b', borderRadius: '7px', border: 'none'}}>
            Accept
          </Button>
        ]}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <h3>1. Introduction to the Clucky Chicks!</h3>
        <p>Clucky Chicks is a collection of 10,000 characters created by Paul B. and the team, with the expectation that they will bring a smile to the face of everyone who sees them! Thank you for visiting our terms and if you have any questions feel free to reach out to us in the Discord or on Twitter. We will be happy to chat.</p>

        <h3>2. What We Own</h3>
        <p>The name and Intellectual Property involved in the Clucky Chicks NFT Project (“Clucky Chicks”) is owned by the team here at Clucky Chicks.
          All rights that are not specifically granted to the users and owners of Clucky Chicks below are reserved by the team or future DAO.
          This includes but is not limited to the intellectual property rights surrounding the images, names, logos, 3D layer files, trademarks, the website, the ability to mint 3D or pixel or other versions of Clucky Chicks, the smart contract code, or anything else not specifically granted by any following licenses.</p>

        <h3>3. What You Own and What You Can Do With It</h3>
        <p>By connecting your Ethereum wallet and minting an NFT with our smart contract, you have purchased a Clucky Chick!
          With this Clucky Chick you can show it off, use it as your PFP, sell it, and even merchandise it up to $50,000 through the sale of physical merch or using your full Clucky Chick in a piece of art you may create. Should you approach that number or expect to go beyond it please reach out to the team and we can discuss a licensing deal for anything beyond that amount.</p>

        <h3>4. Specifics on Commercial and Derivative Rights</h3>
        <p>We appreciate that you want to utilize Clucky Chicks in various ways, and even commercial ways, we are open to you doing just that!
          When it comes to limiting commercial rights, however, we want you as an NFT holder to realize that you may use the Clucky Chick image in its fullness only!
          The individual layered files and traits are proprietary and are our own creation / use.
          We don’t want to see any other projects utilizing our individually crafted layers, so we are not open to you minting new NFTs that are derivatives of our project, change the original Clucky Chick, or minting another full project using our Clucky Chick in any way. (Derivatives are a little boring nowadays anyway right?)
          Other than that, you can create whatever merchandise you would like up to $50,000 USD and should you approach that number or expect to go beyond it please reach out to the team and we’ll discuss a licensing deal for anything beyond that amount.
          (We are not greedy so don’t worry, but it just helps keep us in the loop of what’s going on with our community and their efforts!)
          To limit the use even on merchandise, the user shall not use any Clucky Chicks Licensed Materials in connection with any material, which is unlawful, fraudulent, libelous, defamatory, obscene, pornographic, profane, threatening, abusive, hateful, offensive or otherwise objectionable or unreasonable or infringing upon any laws or regulations or intellectual property rights or proprietary rights or confidentiality obligations and you shall indemnify and defend the Clucky Chicks team against any claims, damages, proceedings, loss or costs arising from such use.
          User shall not use the Clucky Chicks Licensed Materials in any way that could be construed as being adverse or derogatory to the image of Clucky Chicks or any of its subjects featured in the NFTs.</p>

        <h3>5. No Guarantees or Future Promises</h3>
        <p>Clucky Chicks is working hard to put out more content and create things in the future that you can all be proud of and have outlined many of our intentions as such. However, the landscape around NFTs, DAOs and various other things we are hoping to do is shifting and legally gray in many ways.
          When you purchase your Clucky Chick, you agree that your purchase from our initial launch of NFTs is all you are guaranteed to receive in exchange for your funds.
          Whether through primary or secondary channels, the art is what you receive. Any future benefits are ancillary to this purchase and not to be taken into consideration with your initial purchase. You agree that you are not relying on any future commitments by Clucky Chicks beyond the receiving of the art in using this site and participating in our NFT launch.</p>

        <h3>6. Clucky Chicks Are Not Intended as Investments</h3>
        <p>Clucky Chicks are meant to be a cool Non-Fungible Token for you to collect. They are not meant as investment vehicles. We make absolutely no promise or guarantee that these NFTs will be worth anything more than what the market deems the art to be worth. This could very well be zero. (Let’s hope not!)
          We give you our word that we will try to build a strong, close community and bring as much intangible value and positivity to the project as we can!
          You understand that Clucky Chicks have no inherent monetary value, and they should be treated as nothing more than a collectible with potential future value or lack thereof.</p>

        <h3>7. Taxes</h3>
        <p>You are entirely responsible for any tax liability which may arise from minting or reselling your Clucky Chicks.</p>

        <h3>8. Children</h3>
        <p>The Clucky Chicks project is not targeted towards children. You agree that you are over the age of 18, or above the legal age of your jurisdiction, whichever is greater.</p>

        <p style={{ marginBottom: '20px' }}>
          Referral Code : &nbsp;&nbsp;<input className="referral-input" name="referral_code" type="text" value = {referral} onChange={evt => setReferralCode(evt)}/>
          <Checkbox
            checked={termchecked}
            onClick={() => setTermChecked(!termchecked)}
          >
            I agree with this and will press mint button again.
          </Checkbox>
        </p>
      </Modal>
      {
        (web3Modal && web3Modal.cachedProvider) && (
          <div className="mint-part">
            {/* <h2>{10000 - remainTokenCount}/10000</h2> */}
            <div className="mint-count">
              <a onClick={_decreaseMintCount}>-</a>
              <h2>{mintCount}</h2>
              <a onClick={_increaseMintCount}>+</a>
            </div>



            <div className="mint-btn">
              {termchecked && !minting && 
               <a onClick={mintNftHandler}>MINT</a> 
              }
              {termchecked && minting &&
               <a onClick={mintNftHandler}>MINTING...</a> 
              }
              {!termchecked && 
               <a onClick={() => setModalVisible(true)}>MINT</a> 
              }
            </div>
          </div>
        )
      }
      <div className="mint-image">
        <img src="./assets/image/CluckyChicksLineup.png" />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </div>
  );
}
