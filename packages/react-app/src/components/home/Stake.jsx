import React, { useState ,useEffect  } from "react";
import { StakeNFTSlider } from './';
import { NFT_IMAGE_URL, NFT_IMAGE_EXTENSION } from "../../constants";

export default function Stake({
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

  const [stakedTokens, stakedTokensState] = useState([]);
  const [mintedTokens, mintedTokensState] = useState([]);
  const [dailyEggs, dailyEggState] = useState(0);
  const [totalEggs, totalEggState] = useState(0);
  const [nftData,   setNFTState] = useState([{}]);
  const [claiming, setClaming] = useState(false);

  const setNFTData = () => {
    var data = [];
    
    for(var j = 0; j< stakedTokens.length; j++){
      var _subdata = {"tokenId" : "", "imageUrl" : "", isStaked: false};
      _subdata.tokenId = stakedTokens[j];
      _subdata.imageUrl = NFT_IMAGE_URL + stakedTokens[j] + NFT_IMAGE_EXTENSION;
      _subdata.isStaked = true;
      data.push(_subdata);
    }
    for(var i = 0; i< mintedTokens.length; i++){
      var _subdata = {"tokenId" : "", "imageUrl" : "", isStaked: false};
      _subdata.tokenId = mintedTokens[i];
      _subdata.imageUrl = NFT_IMAGE_URL + mintedTokens[i] + NFT_IMAGE_EXTENSION;
      _subdata.isStaked = false;
      data.push(_subdata);
    }
    
    console.log(data);
    return data;
  }

  const bigNumArrToArr = (bigArr) =>{
    var arr = [];
    for(var i =0; i < bigArr.length; i++){
      arr.push(parseInt(bigArr[i]["_hex"]));
    }
    return arr;
  }

  useEffect(() => {
    async function getUserMintState(){
      if(address){
        try {
          //Get user minted tokens
          const mintedTokenFunc = contract["Chicks"].connect(signer)["walletOfOwner"];
          const mintedTokenIds = await mintedTokenFunc(address);
          mintedTokensState(bigNumArrToArr(mintedTokenIds))

          //Get user staked tokens
          const stakedTokenFunc = contract["ChicksStaking"].connect(signer)["getStakedTokens"];
          const stakedTokenIds = await stakedTokenFunc(address);
          stakedTokensState(bigNumArrToArr(stakedTokenIds))

          //Get user daily reward tokens
          const dailyEggFunc = contract["ChicksStaking"].connect(signer)["calcRewardPerDay"];
          const dailyEggToken = await dailyEggFunc(address);
          dailyEggState(parseInt(dailyEggToken["_hex"]))
          console.log("Daily Egg Tokens = " + dailyEggs);

          //Get user total reward tokens
          const totalEggFunc = contract["ChicksStaking"].connect(signer)["getAllRewardedToken"];
          const totalEggTokens = await totalEggFunc(address);
          totalEggState(parseInt(totalEggTokens["_hex"]))
          console.log("Total Egg Tokens = " + totalEggs);

        } catch (e) {
          console.log(e);
        }
        
      }
    }
    getUserMintState();
  }, [address, contract]);

  useEffect(() => {
    async function setNFTslideData(){
      setNFTState(setNFTData());
    }
    setNFTslideData();
  }, [mintedTokens, stakedTokens]);

  const claimAllHandler = async () => {
    setClaming(true);
    try {
      const stakeFunction = contract["ChicksStaking"].connect(signer)["claimAll"];
      const hash = await stakeFunction(address);
      setClaming(false);
    } catch (e) {
      setClaming(false);
      console.log(e);
    }
  };

  return (
    <div className="stakeContainer" id="stakeContainer">
      <div className="joinBox">
        <div className="joinText">
          <h1>JOIN THE CLUCKY CHICKS</h1>
          <p>An anime-inspired alternative universe, where Cluck Chicks are fighting to save the planet from invading Robot overlords.</p>
          <p>While also vying for the attention of other Chicks, to prove who is the most badass motherclucker. Fights will ensue!</p>
          <p>Your NFT will unlock access to the Coop, where you can stake your Chicks, talk to all other holders, plan duels and enter the Cluckyverse.</p>
          <p>As well as play our upcoming suite of competitive PVP and P2E games.</p>
          <a href="/discord" target="_blank">
            <img src='./assets/image/discord1.png' width='20px' height='20px' style={{ marginRight: '20px' }} />
            JOIN THE COOP
          </a>
        </div>
      </div>
      <div className="stakeBox">
        <div className="innerstakeBox">
          {
            // nftData.length == 0 && (
              true && (
              <>
                <div className="imgBox">
                  <img src="./assets/image/Clucky-Chicks-Fight.webp" />
                </div>
                <div className="stakeText">
                  {/* <p>STAKING AVAILABLE ON LAUNCH!</p> */}
                </div>
              </>
            )
          }
          {
            // nftData.length != 0 
            false && (
              <>
                <div className="Text-stake">
                  <div className="stakeNFT-text">
                    <p>Minted Tokens: {mintedTokens.length + stakedTokens.length}</p>
                    <p>Staked Tokens: {stakedTokens.length}</p>
                  </div>
                  <div className="stakeNFT-text">
                    <p>Daily Eggs: {dailyEggs}</p>
                    <p>Total Eggs: {totalEggs}</p>
                  </div>
                </div>

                <div className="imgNFTBox">
                  <StakeNFTSlider    
                  address={address}
                  contract={contract}
                  signer={signer}
                  nftData={nftData}
                  />
                </div>
                <div>
                  <a onClick={claimAllHandler} className="all-claim-btn">{claiming ? "Claiming .." : "Claim All"}</a>
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}
