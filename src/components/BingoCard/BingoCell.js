import React from 'react'
import { colors } from '../../assets/colors'

const BingoCell = (props) => {
    const cellStyle = {
        display: "flex",
        backgroundColor: colors.glace,
        justifyContent: 'center',
        alignContent: 'center',
        width: '17%',
        height: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.marina,
        padding: 5,
    }
    const crossOutStyle={
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
    }
    return (
        <div style={cellStyle} onClick={() => props.onPressItem(props.index)}>
            <p>{props.value}</p>
            {props.selected && (
                <div style={crossOutStyle}>
                    <span style={{fontSize: 50, margin: 0, color: colors.bluespruce}}>X</span>
                </div>
            )}
        </div>
    )
}

export default BingoCell