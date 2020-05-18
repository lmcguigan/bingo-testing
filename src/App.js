import React, { useState } from 'react';
import BingoCard from './components/BingoCard/BingoCard';
import BingoHeader from './components/BingoHeader/BingoHeader';
import { createBingoCard } from './utils/card-builder-utils';
import { getUpdatedCard } from './utils/update-card-utils';
import { BingoValidator } from './utils/check-bingo-utils';

const validator = new BingoValidator(5)

function App() {
  const bingoCard = createBingoCard(5)
  const [values, setValues] = useState(bingoCard)
  const [hasBingo, setHasBingo] = useState(false)
  const onPressItem = (index) => {
    const updatedCard = getUpdatedCard(index, values)
    setValues(updatedCard)
    console.log('Updated card array:', (updatedCard))
    console.log('Indexes of marked cells:', validator.getMarkedItemIndexes(updatedCard))
    if(validator.hasBingo(updatedCard)){
      setHasBingo(true)
    }
  } 
  const appContainerStyle = {
    display: "flex", 
    flexDirection: 'column', 
    alignItems: 'center',
  }
  const modalContainerStyle = {
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgb(0,0,0,0.5)',
    display: "flex", 
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  }
  const modalInnerStyle = {
    width: '50%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 5,
  }
  return (
    <div className="App" style={appContainerStyle}>
      {hasBingo && (<div style={modalContainerStyle}>
        <div style={modalInnerStyle}>
          <p>Congratulations! You got bingo!</p>
        </div>
      </div>)}
      <div style={{paddingTop: 100, width: '80%'}}>
      <BingoHeader/>
      <BingoCard values={values} onPressItem={(index) => onPressItem(index)}/>
      </div>
    </div>
  );
}

export default App;
