import React, {Component} from 'react';
import './Tile.css';

export default class Tile extends Component{

    render() {
        const {row, col, number, isInitial} = this.props;
        const initial = isInitial ? 'initial': ''
        const borderRow = row === 2 || row === 5 ? 'border-row': ''
        const borderCol = col === 2 || col === 5 ? 'border-col': '';
        //const string = value ? value : ''
        
        return (
            <input className={`tile ${borderRow} ${borderCol} ${initial}`}
                    type="text"
                    id={`${row},${col}`}
                    name={`${row},${col}`}
                    defaultValue={number}
                    maxLength="1"
                    onClick={() => this.props.onClick()}
                    onChange={() => this.props.onChange()}
                >
                </input>
        );
    }
}