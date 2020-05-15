import React, { useState } from 'react';
import './App.css';
import BingoCard from './components/BingoCard/BingoCard';
import BingoHeader from './components/BingoHeader/BingoHeader';
import { createBingoCard } from './utils/card-builder-utils';
import { getUpdatedCard } from './utils/update-card-utils';
import { BingoValidator } from './utils/check-bingo-utils';

const validator = new BingoValidator(5)

function App() {
  const bingoCard = createBingoCard(5)
  const [values, setValues] = useState(bingoCard)
  const onPressItem = (index) => {
    const updatedCard = getUpdatedCard(index, values)
    setValues(updatedCard)
    console.log(JSON.stringify(updatedCard))
  } 
  const appContainerStyle = {
    display: "flex", 
    flexDirection: 'column', 
    alignItems: 'center',
    paddingTop: 100
  }
  return (
    <div className="App" style={appContainerStyle}>
      <div style={{width: '80%'}}>
      <BingoHeader/>
      <BingoCard values={values} onPressItem={(index) => onPressItem(index)}/>
      </div>
    </div>
  );
}

export default App;
