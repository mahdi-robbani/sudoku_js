import './App.css';
import Board from './SudokuVisualizer/Board';

function App() {
  return (
    <div className="App">
      <div className="game-board">
      <Board></Board>
      </div>
      <div className="game-info">
        <div>{/*status */}</div>
        <div>{/*TO DO*/}</div>
      </div>
      
    </div>
  );
}
// App = Game
// Board = Board
// Tile = square

export default App;

//npm start
