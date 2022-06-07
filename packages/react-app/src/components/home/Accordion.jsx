import React, { useState, useEffect} from 'react';

export default function Accordion ({ title, children, index, selectedIndex, setSelectedIndex }) {
  const [isOpen, setOpen] = useState(false);

  // const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if(index == selectedIndex) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [selectedIndex])

  const handleClickView = () => {
    setSelectedIndex(index)
    setOpen(!isOpen);
  }
  
  return (
    <div className="accordion-item">
      <div className={`accordion-title ${isOpen ? "open" : ""}`} onClick={() => handleClickView()}>
        <div className='accordionTitle'>{title}</div>
        <div>{isOpen ? <img src='./assets/image/minus.svg' width='10px' height='12px' /> : <img src='./assets/image/angle.png' width='10px' height='12px' />}</div>
      </div>
      <div className={`accordion-con-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
}


// import React, { useState, useEffect } from 'react';

// export default function Accordion ({ title, content, index, selectedIndex, setSelectedIndex }) {
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     if(index == selectedIndex) {
//       setIsActive(true)
//     } else {
//       setIsActive(false)
//     }
//   }, [selectedIndex])

//   const handleClickView = () => {
//     setSelectedIndex(index)
//   }

//   return (
//     <div className="accordion-item">
//       <div className="accordion-title" onClick={() => handleClickView() }>
//         <div className='accordionTitle'>{title}</div>
//         <div>{isActive ? <i className='fas fa-minus'></i> : <i className='fas fa-angle-double-down'></i>}</div>
//       </div>
//       {isActive && <div className="accordion-content">{content}</div>}
//     </div>
//   );
// }