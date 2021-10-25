function checkConflictRow(val, row, board){
    //checks column for conflicts, returns true if conflict

    for(let col = 0; col < board[row].length; col++){
        if (board[row][col] === val){
            return true
        }
    }
    return false
}

function checkConflictCol(val, col, board){
    //checks column for conflicts, returns true if conflict

    for(let row = 0; row < board.length; row++){
        if (board[row][col] === val){
            return true
        }
    }
    return false
}

function checkConflictBox(val, row, col, board){
    //checks box for conflicts, returns true if conflict

    const rowNumberStart = Math.floor(row/3) * 3;
    const rowNumberEnd = rowNumberStart + 3;
    const colNumberStart = Math.floor(col/3) * 3;
    const colNumberEnd = colNumberStart + 3;

    for (let i = rowNumberStart; i < rowNumberEnd; i++){
        for (let j = colNumberStart; j < colNumberEnd; j++){
            if (board[i][j] === val){
                return true
            }
        }
    }
    return false
}

function checkValid(val, row, col, board){
    //check if input is valid
    if (!checkConflictRow(val, row, board) &&
        !checkConflictCol(val, col, board) &&
        !checkConflictBox(val, row, col, board)){
        return true
    } else{
        return false
    }
}

function findEmpty(board){
    const numRows = board.length;
    const numCols = board[0].length;
    for (let row = 0; row < numRows; row++){
        for (let col = 0; col < numCols; col++){
            if (board[row][col] === 0){
                return [row, col]
            }
        }
    }
    return []
}

export function backtrack(board, history){
    //Recursively solve a board using the backtracking algorithm.
    const result = findEmpty(board);
    if (result.length === 0){
        //base case (solved board)
        return true
    } else {
        const [row, col] = result;
        const pos = `${row},${col}`;
        for (let num = 1; num < 10; num++){
            // add to history
            let event = {};
            num = num === 0 ? null : num // repalce 0 with null when storing
            event[`${row},${col}`] = num
            history.push(event);
            //check if solution is valid
            if (checkValid(num, row, col, board)){
                board[row][col] = num
                //run backtrack on next square and return true if it solves
                if (backtrack(board, history)){
                    return true
                }

                //backtrack solution is invalid so reset board
                board[row][col] = 0
            }
        }
    }
    return false
}

