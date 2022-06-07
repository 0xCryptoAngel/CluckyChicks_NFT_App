import React from "react";
// import { Icon } from '@iconify/react';
import './style.css'

export default function RoadMap() {

  return (
    <div className="roadmapContainer" id="roadmapContainer">
      <div className="roadmapBox">
        <div className="innerroadmap">
          <h1>ROADMAP</h1>
          <div className="roadmapContent">
            <div className="roadmapLeft">
              <div className="cc-launch">
                <img src="./assets/image/Newaa.png" width="100%" />
                <div className="cc-launch-txt">
                  <h2>CLUCKY CHICK LAUNCH</h2>
                  <p>Introducing the Cluckyverse, it's inhabitants. Growing a strong Coop of 10,000 Chicks.</p>
                </div>
              </div>
              <div className="cc-phase2">
                <img src="./assets/image/Phase2Chicks.png" width="100%" />
                <div className="cc-phase2-txt">
                  <h2>LAUNCH PHASES 2-10</h2>
                  <p>Each phase will launch 1000 new Clucky Chicks. Community 'Cluck Game' alpha/beta tests.</p>
                </div>
              </div>
            </div>
            <div className="roadmapRight">
              <div className="staking-economy">
                <img src="./assets/image/Eggies.png" width="100%" />
                <div className="staking-economy-txt">
                  <h2>STAKING + ECONOMY</h2>
                  <p>The birth of the Cluckyverse economy through use of the Staking + $EGG reward distribution.</p>
                </div>
              </div>
              <div className="chick-factory"> 
                <img src="./assets/image/Factory.png" width="100%" />
                <div className="chick-factory-txt">
                  <h2>CHICK FACTORY</h2>
                  <p>Clucky Chicks have taken over one of the Robot factories and want to modify their bodies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ownBox">
        <div className="innerownBox">
          <h1>WHY OWN CLUCKY CHICKS?</h1>
          <div className="earnBox ownChild">
            <div className="innerown-img">
              <img src="./assets/image/EARN.png" />
            </div>
            <div className="innerown-text">
              <h2>EARN</h2>
              <p>
                Clucky Chicks can be staked to earn $EGG, which are our Cluckyversetoken. This enables marketplace purchases such as leveling your NFT, naming your Chick + adding a personal Backstory. <br /> 
                Plus future gaming bonuses or even exclusive future NFT mints.
              </p>
            </div>
          </div>
          <div className="playBox ownChild">
            <div className="innerown-img">
              <img src="./assets/image/H2.png" />
            </div>
            <div className="innerown-text">
              <h2>PLAY</h2>
              <p>
                Clucky Chicks are not just an NFT that is awesome to look at. We are in the process of creating full blown games to utilise them in. <br /> 
                These will range from our 2D competitive 'Clucky Game', up to our 3D 'Ckuckyverse Arcade'. Get ready to play together and have some fun.</p>
            </div>
          </div>
          <div className="collectBox ownChild">
            <div className="innerown-img">
              <img src="./assets/image/potion2.png" />
            </div>
            <div className="innerown-text">
              <h2>COLLECT + EVOLVE</h2>
              <p>
                Clucky Chicks will initially launch a total collection of 10,000, however, we have MANY ideas in store for this project. A varied Coop will be an asset. <br />
                You are going to want to collect these Chicks because we have great utility between the Chicks as well as future additions.
          
                <img src='./assets/image/eye.svg' width='15px' height='15px' />
              </p>
              
            </div>
          </div>
          <div className="communityBox ownChild">
            <div className="innerown-img">
              <img src="./assets/image/hen.png" />
            </div>
            <div className="innerown-text">
              <h2>COMMUNITY</h2>
              <p>Clucky Chicks is and always will be a community-first project. Since it's very inception, a dedicated core community has been established. We want to expand our Coop to you and your friends. Be a part of something great. Let's Cluck around the world. *cluck cluck*</p>
            </div>
          </div>
          <div className="chatbtnBox">
            <a href="/discord" target="_blank">
              <img src='./assets/image/discord1.png' width='20px' height='20px' style={{ marginRight: '10px' }} />
              COME CHAT WITH US
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
