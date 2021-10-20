import React, {Component} from 'react';
import './Tile.css';

export default class Tile extends Component{


    render() {
        return (
            <button className="tile"
                    onClick={() => this.props.onClick()}
                >
                {this.props.value}
                </button>
        );
    }
}