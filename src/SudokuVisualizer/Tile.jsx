import React, {Component} from 'react';
import './Tile.css';

export default class Tile extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={
    //         value: null,
    //     };
    // }

    render() {
        return (
            <button className="tile">
                {this.props.value}
                </button>
        );
    }
}