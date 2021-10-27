import React, {Component} from 'react';
import Tile from './Tile';
import './Board.css';
import {backtrack, isValid} from '../algorithms/backtrack';

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
            inputStatus: '',
            gameStatus: '',
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
                const isInitial = value ? true: false;
                const tile = {row, col, value, isInitial};
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

    handleClick() {
        console.log("click")
        this.setState({inputStatus: ''})
    }

    handleChange(row, col){
        const newGrid = this.state.grid.slice()
        let valueArray = this.getValueArray(newGrid)
        let newValue = parseInt(document.getElementById(`${row},${col}`).value)
        if (isValid(newValue, row, col, valueArray)) {
            // if input is valid add it to state
            console.log("valid")
            newGrid[row][col].value = newValue
            this.setState({grid : newGrid})
        } else {
            //reset value and warn user
            document.getElementById(`${row},${col}`).value = null
            this.setState({inputStatus: 'Invalid Move'})
        }
        console.log(this.state.grid)
    }

    getValueArray(grid){
        //get an array of values from the grid array
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
        let gridBacktrack = this.getValueArray(gridDisplay)
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

    resetBoard(){
        let newGrid = this.state.grid.slice()
        newGrid.forEach((row, rowIdx) =>{
            row.forEach((data, colIdx) => {
                const val = INITIAL_BOARD[rowIdx][colIdx]
                data.value =  val ? val : null
            })
        })
        this.setState({grid: newGrid})
    }

    renderTile(tile){
        const {row, col, value, isInitial} = tile;
        return <Tile
                    key={`${row},${col}`}
                    row={row}
                    col={col}
                    number={value}
                    isInitial={isInitial}
                    onClick={() => this.handleClick()}
                    onChange={() => this.handleChange(row, col)}
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
                <button onClick={() => this.resetBoard()}>Reset Board</button>
                <div className="grid">
                    {board}
                </div>
                <div class="inputStatus">{this.state.inputStatus}</div>
                <div ckass="gameStatus">{this.state.gameStatus}</div>
            </div>

        );
    }
}