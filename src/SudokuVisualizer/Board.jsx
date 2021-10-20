import React, {Component} from 'react';
import Tile from './Tile';
import './Board.css';

export default class Board extends Component {
    renderTile(i){
        return <Tile value={i}/>;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderTile(0)}
                    {this.renderTile(1)}
                    {this.renderTile(2)}
                </div>
                <div className="board-row">
                    {this.renderTile(3)}
                    {this.renderTile(4)}
                    {this.renderTile(5)}
                </div>
                <div className="board-row">
                    {this.renderTile(6)}
                    {this.renderTile(7)}
                    {this.renderTile(8)}
                </div>
            </div>

        );
    }
}