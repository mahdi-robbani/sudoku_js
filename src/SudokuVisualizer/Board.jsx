import React, {Component} from 'react';
import Tile from './Tile';
import './Board.css';
import {backtrack} from '../algorithms/backtrack';

export default class Board extends Component {
    constructor(props){
        super(props);
        this.numRows = 9;
        this.numCols = 9;
        this.state = {
            grid: [[null, null, null, 2, 6, null, 7, null, 1],
                     [6, 8, null, null, 7, null, null, 9, null],
                     [1, 9, null, null, null, 4, 5, null, null],
                     [8, 2, null, 1, null, null, null, 4, null],
                     [null, null, 4, 6, null, 2, 9, null, null],
                     [null, 5, null, null, null, 3, null, 2, 8],
                     [null, null, 9, 3, null, null, null, 7, 4],
                     [null, 4, null, null, 5, null, null, 3, 6],
                     [7, null, 3, null, 1, 8, null, null, null]],
        }
    }

    handleClick(i, j) {
        // const squares = this.state.squares.slice();
        // squares[i] = 'X';
        // this.setState(squares);
        console.log(i, j)
    }

    visualizeBacktrack(){
        let newGrid = this.state.grid.slice()
        backtrack(newGrid)
        this.setState({grid: newGrid})
    }

    renderTile(i, j){
        return <Tile 
                    value={this.state.grid[i][j]}
                    onClick={() => this.handleClick(i, j)}
                />;
    }


    render() {
        const status = 'Next player: X';
        
        let rows = []
        for (let i = 0; i < this.numRows; i++){
            let cols = [];
            for (let j = 0; j < this.numCols; j++){
                cols.push(<React.Fragment>
                    {this.renderTile(i,j)}
                </React.Fragment>)
            }
            rows.push(<div className="board-row" key={i}>
                {cols}
            </div>)
        }
        console.log(rows)

        return (
            <div>
                <button onClick={() => this.visualizeBacktrack()}>Solve Board</button>
                {rows}
            </div>

        );
    }
}