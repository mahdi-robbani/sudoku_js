import React, {Component} from 'react';
import Tile from './Tile';
import './Board.css';
import {backtrack} from '../algorithms/backtrack';

const INITIAL_BOARD = [[0, 0, 0, 2, 6, 0, 7, 0, 1],
                        [6, 8, 0, 0, 7, 0, 0, 9, 0],
                        [1, 9, 0, 0, 0, 4, 5, 0, 0],
                        [8, 2, 0, 1, 0, 0, 0, 4, 0],
                        [0, 0, 4, 6, 0, 2, 9, 0, 0],
                        [0, 5, 0, 0, 0, 3, 0, 2, 8],
                        [0, 0, 9, 3, 0, 0, 0, 7, 4],
                        [0, 4, 0, 0, 5, 0, 0, 3, 6],
                        [7, 0, 3, 0, 1, 8, 0, 0, 0]]

export default class Board extends Component {
    constructor(props){
        super(props);
        this.numRows = 9;
        this.numCols = 9;
        this.state = {
            grid: [],
        }
    }

    getInitialGrid(){
        let grid = [];
        for (let i = 0; i < this.numRows; i++){
            let currentRow = [];
            for (let j = 0; j < this.numCols; j++){
                const value = INITIAL_BOARD[i][j] ? INITIAL_BOARD[i][j] : null;
                const row = i;
                const col = j;
                const isBorderRow = row === 2 || row === 5 ? true : false;
                const isBorderCol = col === 2 || col === 5 ? true: false;
                const isInitial = value ? true: false;
                const tile = {row, col, value, isBorderRow, isBorderCol, isInitial};
                currentRow.push(tile);
            }
            grid.push(currentRow);
        }
        return grid
    }

    componentDidMount(){
        // set initial state of board
        const grid = this.getInitialGrid();
        this.setState({grid})
    }

    handleClick(i, j) {
        // const squares = this.state.squares.slice();
        // squares[i] = 'X';
        // this.setState(squares);
        console.log(i, j)
    }

    getBacktrackArray(grid){
        let newGrid = [];
        for (const row of grid){
            let currentRow = [];
            for (const tile of row){
                const value = tile.value === null ? 0 : tile.value
                currentRow.push(value)
            }
            newGrid.push(currentRow)
        }
        return newGrid
    }

    visualizeBacktrack(){
        let gridDisplay = this.state.grid.slice()
        let gridBacktrack = this.getBacktrackArray(gridDisplay)
        let history = [];
        
        backtrack(gridBacktrack, history)

        for (let idx = 0; idx < history.length; idx ++){
            setTimeout(() => {
                const element = history[idx]
                const key = Object.keys(element)[0]
                const [i, j] = key.split(',')
                gridDisplay[i][j].value = element[key]
                console.log(`Key: ${key} Value: ${element[key]}`)
                this.setState({grid: gridDisplay})
            }, 10 * idx)
        }
    }

    renderTile(tile){
        const {row, col, value, isBorderRow, isBorderCol, isInitial} = tile;
        return <Tile
                    key={`${row},${col}`}
                    col={col}
                    value={value}
                    isBorderRow={isBorderRow}
                    isBorderCol={isBorderCol}
                    isInitial={isInitial}
                    onClick={() => this.handleClick(row, col)}
                />;
    }

    render() {
        const {grid} = this.state;
        
        let board = [];
        grid.forEach((row, rowIdx) => {
            let currentRow = [];
            row.forEach((tileData, tileDataIdx) => {
                currentRow.push(<React.Fragment key={tileDataIdx}>
                    {this.renderTile(tileData)}
                </React.Fragment>)
            })
            board.push(<div className="board-row" key={rowIdx}>
                    {currentRow}
                </div>)
        })


        return (
            <div>
                <button onClick={() => this.visualizeBacktrack()}>Solve Board</button>
                <div className="grid">
                    {board}
                </div>
            </div>

        );
    }
}