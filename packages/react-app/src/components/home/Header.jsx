import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./style.css";
import { ConnectWallet } from "./";
import { HomePage } from "../../pages/HomePage"

export default function Header({
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
    remainTokenCount,
}) {

    const [mobilemenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobilemenuOpen);
    }

    return (
        <div className="headerContainer">
            <header className="header">
                <div className="head-contact">
                    <a href="/discord" target="_blank">
                        <span className="discord">
                            <img src='./assets/image/discord.png' width='30px' height='30px' />
                        </span>
                    </a>
                    <a href="https://twitter.com/CluckyChicksNFT">
                        <span className="twitter">
                            <img src='./assets/image/twitter.png' width='30px' height='30px' />
                        </span>
                    </a>
                    <a href="mailto:paul@cluckychicks.app">
                        <span className="mailbox">
                            <img src='./assets/image/mail.png' width='30px' height='30px' />
                        </span>
                    </a>
                </div>
                <div className="logo">
                    <img src="./assets/image/CluckyChicksHeadLogo.png" />
                </div>
                <div className="connectwallet-btn">
                    <ConnectWallet
                        address={address}
                        localProvider={localProvider}
                        userSigner={userSigner}
                        mainnetProvider={mainnetProvider}
                        price={price}
                        web3Modal={web3Modal}
                        loadWeb3Modal={loadWeb3Modal}
                        logoutOfWeb3Modal={logoutOfWeb3Modal}
                        blockExplorer={blockExplorer}
                        contract={contract}
                        signer={userSigner}
                        remainTokenCount={remainTokenCount}
                    />
                </div>
            </header>
            <div className="mainmenu">
                <div className="arrow top_arr"></div>

                <div className="mobileMenu">
                    <div className="mobile_icon" onClick={toggleMobileMenu}>
                        {mobilemenuOpen && (
                            <img src='./assets/image/multiply.png' width='20px' height='20px' />
                        )}
                        {!mobilemenuOpen && (
                            <img src='./assets/image/menu.png' width='20px' height='20px' />
                        )}
                    </div>

                    <div className={`mobile_ul ${!mobilemenuOpen ? "collapsed" : ""}`}>
                        <ul>
                            <li><HashLink to="/">HOME</HashLink></li>
                            <li><HashLink to="/#mintContainer">MINT</HashLink></li>
                            <li><HashLink to="/staking">STAKE</HashLink></li>
                            <li><HashLink to="/#stakeContainer">JOIN</HashLink></li>
                            <li><HashLink to="/#roadmapContainer">ROADMAP</HashLink></li>
                            <li><HashLink to="/#teamContainer">TEAM</HashLink></li>
                            <li><HashLink to="/#faqContainer">FAQ</HashLink></li>
                        </ul>
                    </div>
                </div>

                <div className="desktopMenu">
                    <ul>
                        <li><HashLink to="/">HOME</HashLink></li>
                        <li><HashLink to="/#mintContainer">MINT</HashLink></li>
                        <li><HashLink to="/staking">STAKE</HashLink></li>
                        <li><HashLink to="/#stakeContainer">JOIN</HashLink></li>
                        <li><HashLink to="/#roadmapContainer">ROADMAP</HashLink></li>
                        <li><HashLink to="/#teamContainer">TEAM</HashLink></li>
                        <li><HashLink to="/#faqContainer">FAQ</HashLink></li>
                        {/* <li><a href="/#faqContainer" style={{ transition: '0.5s' }}>FAQ</a></li> */}
                    </ul>
                </div>

                <div className="arrow bottom_arr"></div>
            </div>
        </div>
    );
}
