import React from 'react'
import { colors } from '../../assets/colors'

const BingoHeader = () => {
    const letters = 'bingo'.toUpperCase().split('')
    const divStyle ={
        display: 'flex',
        flexDirection: 'row',
    }
    const letterContainerStyle = {
        display: 'flex',
        width: '20%',
        justifyContent: 'center'
    }
    const letterStyle = {
        color: colors.bluespruce,
        fontSize: 30
    }
    return (
        <div style={divStyle}>
            {letters.map((letter, index) => {
                return(
                    <div style={letterContainerStyle} key={index}><span style={letterStyle}>{letter}</span></div>
                )
            })}
        </div>
    )
}

export default BingoHeader