import React, {useState} from 'react';
import { Accordion } from './';

export default function Faq() {
  const [selectedIndex, setSelectedIndex] = useState(5)

  return (
    <div className="faqContainer" id="faqContainer">
      <h1>FAQ</h1>
      <div className="accordion">
        <Accordion title="WHAT ARE CLUCKY CHICKS?" index={0} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}>
            <p>Clucky Chicks is a collection of 10,000 unique hand drawn NFTs on the Ethereum Blockchain. Each one is badass and in great shape!</p>
        </Accordion>
        <Accordion title="HOW MUCH DO CLUCKY CHICKS COST?" index={1} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}>
            <p>The OG collection of Clucky Chicks are launching at only 0.03 ETH. Once they hit secondary market however, it's anyone's guess, as we don't control that.</p>
        </Accordion>
        <Accordion title="HOW WERE CLUCKY CHICKS CREATED?" index={2} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}>
            <p>Clucky Chicks are generated algorithmically by mixing up a variety of hand drawn properties with different rarities in the following categories:<br />
            Background, Aura, Body, Clothing, Face, Eyes / Eyewear, Head, Weapon and Accessory.</p>
        </Accordion>
        <Accordion title="WHERE CAN WE TALK TO YOU?" index={3} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}>
            <p>You can either tweet me at <a href='https://twitter.com/CluckyChicksNFT'>@CluckyChicksNFT</a> on Twitter. Or preferably join our Discord at <a href="/discord" target="_blank"> https://cluckychicks.app/discord</a> for a chat! <br /> 
            If you wish to contact privately, email to <a href='mailto:paul@cluckychicks.app'>Paul@CluckyChicks.app</a>.</p>
        </Accordion>
        <Accordion title="WHAT IS THE SMART CONTRACT ADDRESS OF CLUCKY CHICKS?" index={4} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}>
            <p>This link will be added as soon as it is live.</p>
        </Accordion>
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from 'react';
// import { Accordion } from './';

// export default function Faq() {
//   const [selectedIndex, setSelectedIndex] = useState(5)

//   const accordionData = [
//     {
//       title: 'WHAT ARE CLUCKY CHICKS?',
//       content: `Clucky Chicks is a collection of 10,000 unique hand drawn NFTs on the Ethereum Blockchain. Each one is badass and in great shape!`
//     },
//     {
//       title: 'HOW MUCH DO CLUCKY CHICKS COST?',
//       content: `The OG collection of Clucky Chicks are launching at only 0.05 ETH. Once they hit secondary market however, it's anyone's guess, as we don't control that.`
//     },
//     {
//       title: 'HOW WERE CLUCKY CHICKS CREATED?',
//       content: `Clucky Chicks are generated algorithmically by mixing up a variety of hand drawn properties with different rarities in the following categories:
//       Background, Aura, Body, Clothing, Face, Eyes / Eyewear, Head, Weapon and Accessory.`
//     },
//     {
//       title: 'WHERE CAN WE TALK TO YOU?',
//       content: `You can either tweet me at @CluckyChicksNFT on Twitter. Or preferably join our Discord at https://cluckychicks.app/discord for a chat! If you wish to contact privately, email to Paul@CluckyChicks.app.`
//     },
//     {
//       title: 'WHAT IS THE SMART CONTRACT ADDRESS OF CLUCKY CHICKS?',
//       content: `This link will be added as soon as it is live.`
//     }
//   ];

//   return (
//     <div className="faqContainer" id="faqContainer">
//       <h1>FAQ</h1>
//       <div className="accordion">
//         {accordionData.map((data, index) => (
//             <Accordion 
//               title={data.title} 
//               content={data.content} 
//               index={index} 
//               key={index}
//               selectedIndex={selectedIndex}
//               setSelectedIndex={setSelectedIndex} />
//           ))}
//       </div>
//     </div>
//   );
// }
