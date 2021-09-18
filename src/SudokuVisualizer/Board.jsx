import React, {Component} from 'react';
import Tile from './Tile';
import './Board.css';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                Test
                <Tile></Tile>
            </div>
        );
    }
}