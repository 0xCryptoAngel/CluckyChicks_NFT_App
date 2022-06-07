import React, { useEffect, useState } from 'react';

export default function StakeButton ({
  isStaked, 
  tokenId, 
  totalStake, 
  setTotalStake, 
  totalremoveStake, 
  setTotalRemoveStake, 
  stakedata, 
  setStakeData, 
  unstakedata, 
  setUnStakeData,
  isDisabled
}) {
  
  const [isActive, setIsActive] = useState(false);

  const handleClickView = () => {
    let active = !isActive
    setIsActive(active)
    if(isStaked) {
      if(!active) {
          setTotalRemoveStake(totalremoveStake - 1)
          setUnStakeData(unstakedata.filter((value) =>  value != tokenId ))
      }else {
          setTotalRemoveStake(totalremoveStake + 1)
          setUnStakeData([...unstakedata, tokenId]);
      }
    }else {
      if(!active) {
          setTotalStake(totalStake - 1)
          setStakeData(stakedata.filter((value) =>  value != tokenId ))
      }else {
          setTotalStake(totalStake + 1)
          setStakeData([...stakedata,  tokenId]);
      }
    }
  }

  return (
    <button onClick={() => handleClickView() } disabled={isDisabled} className='toggle-staking-btn'>
        {isStaked && (isActive ? 'STAKE AGAIN' : 'REMOVE FROM STAKE')}
        {!isStaked && (isActive ? 'UNSTAKE' : 'ADD TO STAKE')}
    </button>
  );
}