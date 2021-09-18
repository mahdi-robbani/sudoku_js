import React, {Component} from 'react';
import './Tile.css';

export default class Tile extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render() {
        return (
            <button className="Tile"></button>
        );
    }
}