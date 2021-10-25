import React, {Component} from 'react';
import './Tile.css';

export default class Tile extends Component{

    render() {
        const {row, col, value, isBorderRow, isBorderCol, isInitial} = this.props;
        const initial = isInitial ? 'initial': ''
        const borderRow = isBorderRow ? 'border-row': ''
        const borderCol = isBorderCol ? 'border-col': ''

        return (
            <input className={`tile ${borderRow} ${borderCol} ${initial}`}
                    id={`${row},${col}`}
                    onClick={() => this.props.onClick()}
                    value={value}
                    maxLength="1"
                    onKeyUp={() => this.props.onKeyUp()}
                >
                </input>
        );
    }
}