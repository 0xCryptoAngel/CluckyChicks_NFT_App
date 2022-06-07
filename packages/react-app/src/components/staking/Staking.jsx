import React, { useState ,useEffect  } from "react";
import { StakeButton } from '.';
import { NFT_IMAGE_URL, NFT_IMAGE_EXTENSION } from "../../constants";
import "./staking-style.css";

export default function Staking({
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

  const [eggBalance, eggBalanceState] = useState(0);
  const [stakedTokens, stakedTokensState] = useState([]);
  const [mintedTokens, mintedTokensState] = useState([]);
  const [dailyEggs, dailyEggState] = useState(0);
  const [totalEggs, totalEggState] = useState(0);
  const [nftData,   setNFTState] = useState([{}]);
  const [claiming, setClaming] = useState(false);

  const [totalStake, setTotalStake] = useState(0);
  const [totalremoveStake, setTotalRemoveStake] = useState(0);
  const [stakedata, setStakeData] = useState([]);
  const [unstakedata, setUnStakeData] = useState([]);
  const [staking,  setStaking] = useState(false);
  const [unStaking, setUnStaking] = useState(false);

  const setNFTData = () => {
    var data = [];
    
    for(var j = 0; j< stakedTokens.length; j++){
      var _subdata = {"tokenId" : "", "imageUrl" : "", isStaked: false, isDisabled: false};
      _subdata.tokenId = stakedTokens[j];
      _subdata.imageUrl = NFT_IMAGE_URL + stakedTokens[j] + NFT_IMAGE_EXTENSION;
      _subdata.isStaked = true;
      _subdata.isDisabled = false;
      data.push(_subdata);
    }
    for(var i = 0; i< mintedTokens.length; i++){
      var _subdata = {"tokenId" : "", "imageUrl" : "", isStaked: false, isDisabled: false};
      _subdata.tokenId = mintedTokens[i];
      _subdata.imageUrl = NFT_IMAGE_URL + mintedTokens[i] + NFT_IMAGE_EXTENSION;
      _subdata.isStaked = false;
      _subdata.isDisabled = false;
      data.push(_subdata);
    }
    
    console.log(data);
    data.sort((a, b) => a.tokenId - b.tokenId);
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
          //get user balance egg tokens
          // const result = await contract.methods.balanceOf(walletAddress).call();
          const balanceFunc = contract["Egg"].connect(signer)["balanceOf"];
          const balance = await balanceFunc(address);
          eggBalanceState((parseInt(balance["_hex"]) / (10**18)).toFixed(2));
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
    function setNFTslideData(){
      setNFTState(setNFTData());
    }
    setNFTslideData();
  }, [mintedTokens, stakedTokens]);

  const claimAllHandler = async () => {
    setClaming(true);
    try {
      const stakeFunction = contract["ChicksStaking"].connect(signer)["claimAll"];
      const hash = await stakeFunction(address);
      await hash.wait();
      totalEggState(0);
      setClaming(false);
    } catch (e) {
      setClaming(false);
      console.log(e);
    }
  };

  const approveHandler = async () => {
    try {
        const approveFunction = contract["Chicks"].connect(signer)["setApprovalForAll"];
        const hash = await approveFunction(contract["ChicksStaking"].address, true);
        await hash.wait();
    } catch (e) {
        console.log(e);
    }
    };
    
  const stakeHandler = async (tokenIds) => {
    setStaking(true);
    console.log("StakeData=>", tokenIds)
    try {
      tokenIds.map((id) => {
        let index = nftData.findIndex(obj => obj.tokenId == id)
        nftData[index].isDisabled = true;
      })
      await approveHandler();
      const stakeFunction = contract["ChicksStaking"].connect(signer)["stakeArray"];
      const hash = await stakeFunction(tokenIds);
      await hash.wait();
      setStaking(false);
      setTotalStake(0);
      window.location.reload(false);
    } catch (e) {
      setStaking(false);
      console.log(e);
    }
  };

  const stakeSomeHandler = async () => {
    let arr = [];
    arr = stakedata;

    if(arr.length == 0) return;
    await stakeHandler(arr);
  };

  const stakeAllHandler = async () => {
    let arr = [];
    nftData.map((data) => {
      if(!data.isStaked){
        arr.push(data.tokenId);
      }
    });
    
    if(arr.length == 0) return;
    
    await stakeHandler(arr);
  };

  const unStakeHandler = async () => {
    setUnStaking(true);
    try {
      unstakedata.map((id) => {
        let index = nftData.findIndex(obj => obj.tokenId == id)
        nftData[index].isDisabled = true;
      })
      const unstakeFunction = contract["ChicksStaking"].connect(signer)["unstakeArray"];
      const hash = await unstakeFunction(address, unstakedata);
      await hash.wait();
      setUnStaking(false);
      setTotalRemoveStake(0);
      window.location.reload(false);
    } catch (e) {
      setUnStaking(false);
      console.log(e);
    }
  };

  return (
    <div className="" id="">
        <div className="staking-title">
          <p>STAKE YOUR CHICKS</p>
        </div>
        <div className="group-btn">
            <div className="top-btns">
                <a >
                  <img src="./assets/image/waterdrop1.png" />
                  BALANCE: {eggBalance}
                </a>
                <a >
                  <img src="./assets/image/waterdrop1.png" />
                  DAILY&nbsp;RATE: {dailyEggs}
                </a>
                <a onClick={claimAllHandler}>{claiming  ? 'CLAIMING...' : 'CLAIM: (' + totalEggs + ' $EGG)'}</a>
            </div>
            <div className="bottom-btns">
                <a onClick={stakeSomeHandler}>{staking ? 'STAKING...' : 'STAKE (' + totalStake + ')' }</a>
                <a onClick={stakeAllHandler}>STAKE ALL</a>
                <a onClick={unStakeHandler}>{unStaking ? 'UNSTAKING...' : 'UNSTAKE (' + totalremoveStake + ')'}</a>
            </div>
            <div className="group-arrow">
              <div className="arrow-stake"></div>
              <img src="./assets/image/waterdrop.png" />
              <div className="arrow-stake"></div>
            </div>
        </div>
        <div className="group-NFT">
            {nftData.map((data, index) => (
              <div className="staking-nft-list" key={index}>
                <p>#{data.tokenId}</p>
                <img src={data.imageUrl} width="200px" height="200px" />
                <p>{(data.tokenId < 7) ? "3":(data.tokenId < 51) ? "2" : "1"} $EGG / Day</p>

                <StakeButton
                  isStaked={data.isStaked}
                  tokenId={data.tokenId}
                  totalStake={totalStake}
                  setTotalStake={setTotalStake}
                  totalremoveStake={totalremoveStake}
                  setTotalRemoveStake={setTotalRemoveStake}
                  stakedata={stakedata}
                  setStakeData={setStakeData}
                  unstakedata={unstakedata}
                  setUnStakeData={setUnStakeData}
                  isDisabled={data.isDisabled}
                />
              </div>
            ))}
        </div>
    </div>
  );
}
