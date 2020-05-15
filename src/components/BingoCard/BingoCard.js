import React from 'react';
import BingoCell from './BingoCell';

const BingoCard = props => {
    const cardStyle ={
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 20,
        display: 'flex'
    }
    return (
        <div style={cardStyle}>
            {props.values.map((item, index) => {
                return (
                    <BingoCell
                        value={item.value}
                        key={index}
                        index={index}
                        selected={item.marked}
                        onPressItem={props.onPressItem}
                    />
                )
            })}

        </div>
    )
}

export default BingoCard