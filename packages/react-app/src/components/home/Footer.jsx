import React from "react";

export default function Footer() {

  return (
    <div className="footerContainer">
      <div className="footer-text">
        <p>© 2022 CLUCKY CHICKS</p>
      </div>
      <div className="footer-contact">
        
        <a href="/discord" target="_blank">
          <span className="foot-twitter">
              <img src='./assets/image/discord.png' width='20px' height='20px' />
          </span>
        </a>
        <a href="https://twitter.com/CluckyChicksNFT">
          <span className="foot-discord">
            <img src='./assets/image/twitter.png' width='20px' height='20px' />
          </span>
        </a>
        <a href="mailto:paul@cluckychicks.app">
          <span className="foot-mailbox">
            <img src='./assets/image/mail.png' width='20px' height='20px' />
          </span>
        </a>
      </div>
    </div>
  );
}
