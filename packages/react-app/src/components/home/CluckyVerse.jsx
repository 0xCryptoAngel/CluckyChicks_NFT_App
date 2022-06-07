import React, { useState } from "react";

export default function CluckyVerse() {

  return (
    <div className="cluckverseContainer">
      <div className="verse-title">
        <h1>INTO THE CLUCKYVERSE</h1>
        <div className="flow">
          <img src="./assets/image/flow.svg" />
        </div>
      </div>
      <div className="verse-content">
        <div className="verse-svg">
          <img src="./assets/image/cluckverse.svg" />
        </div>
        
        <div className="verseBox">
          <div className="pixelVerse">
            <img src="./assets/image/new2.gif" />
            <h2>PIXEL METAVERSE</h2>
            <div className="verse-text">
              <p>
                Clucky Chicks is aiming to expand into the Pixelverse. <br />
                We will create a collection of Pixel Chicks that will be available to all Clucky Chicks holders for FREE.
              </p>
            </div>
          </div>

          <div className="Verse2D">
            <img src="./assets/image/chickenf.webp" />
            <h2>2D METAVERSE</h2>
            <div className="verse-text">
              <p>
                This is the standard protocol for Clucky Chicks. <br />
                Growing in the 2D Metaverse through various utilities. <br />
                This is the NFT that everyone starts with.
              </p>
            </div>
          </div>

          <div className="Verse3D">
            <img src="./assets/image/asdsa.webp" />
            <h2>3D METAVERSE</h2>
            <div className="verse-text">
              <p>
                Expanding into the 3D realm is the next evolution of Clucky Chicks and the Cluckyverse. Get that extra D! <br />
                This will also unlock Physical Collectibles for holders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
