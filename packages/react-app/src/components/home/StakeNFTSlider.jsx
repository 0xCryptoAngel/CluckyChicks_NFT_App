import React, {useState ,useEffect  } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

export default function StakeNFTSlider({
    address,
    contract,
    signer,
    nftData
  }) {
      
    const [_nftData, setNFTdata] = useState([]);
    const [staking,  setStaking] = useState(false);
    const [unStaking, setUnStaking] = useState(false);

    useEffect(() => {
        console.log(nftData);
        async function setNFTdataEff(){
            setNFTdata(nftData);
        }
        setNFTdataEff();
    }, [nftData]);

    var settings = {
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: false,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1368,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const approveHandler = async () => {
    try {
        const approveFunction = contract["Chicks"].connect(signer)["setApprovalForAll"];
        const hash = await approveFunction(contract["ChicksStaking"].address, true);
    } catch (e) {
        console.log(e);
    }
    };
    
  const stakeHandler = async (tokenId) => {
    setStaking(true);
    try {
      await approveHandler();
      const stakeFunction = contract["ChicksStaking"].connect(signer)["stake"];
      const hash = await stakeFunction(tokenId);
        setStaking(false);
    } catch (e) {
        setStaking(false);
      console.log(e);
    }
  };

  const unStakeHandler = async (tokenId) => {
    setUnStaking(true);
    try {
      const unstakeFunction = contract["ChicksStaking"].connect(signer)["unstake"];
      const hash = await unstakeFunction(address, tokenId);
        setUnStaking(false);
    } catch (e) {
        setUnStaking(false);
      console.log(e);
    }
  };

    return (
        <Slider {...settings}>
            {_nftData.map((data, index) => (
                <div className="NFTitem" key={index}>
                    <img src={data.imageUrl} className="NFTitem_img" width="190px" height="190px" />
                    {
                        data.isStaked && (
                        <><a onClick={() => unStakeHandler(data.tokenId)} className="nftstake-btn">{unStaking?"UnStaking" : "UnStake"}</a></>
                        )
                    }
                    {
                        !data.isStaked && (
                        <><a onClick={() => stakeHandler(data.tokenId)} className="nftstake-btn">{staking?"Staking" : "Stake"}</a></>
                        )
                    }
                </div>
            ))}
        </Slider>
    );
}