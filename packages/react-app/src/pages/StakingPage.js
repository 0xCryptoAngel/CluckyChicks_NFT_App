import React from "react";
import { Header } from "../components/home";
import { Staking } from "../components/staking";

function StakingPage(props) {
    return (
        <div className="Staking">
            <Header {...props} />
            <Staking {...props} />
        </div>
    );
  }
  
  export default StakingPage;