import React, {Component} from 'react';
import './Tile.css';

export default class Tile extends Component{

    render() {
        const {row, col, value, isBorderRow, isBorderCol, isInitial} = this.props;
        const initial = isInitial ? 'initial': ''
        const borderRow = isBorderRow ? 'border-row': ''
        const borderCol = isBorderCol ? 'border-col': ''
        //const string = value ? value : ''

        return (
            <input className={`tile ${borderRow} ${borderCol} ${initial}`}
                type="text"
                    id={`${row},${col}`}
                    name={`${row},${col}`}
                    onClick={() => this.props.onClick()}
                    defaultValue={value}
                    maxLength="1"
                >
                </input>
        );
    }
}