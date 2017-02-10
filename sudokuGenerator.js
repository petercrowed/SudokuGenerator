function getSudoku(howHard) {
// Sudoku Numbers Generator

    var board = new Array(9);
    for (var i = 0; i < 9; i++) {
        board[i] = new Array(9);
    }


    function nextBoard(difficulty) {

        nextCell(0, 0);
        makeHoles(difficulty);
        return board;
    }

    function nextCell(x, y) {
        nextX = x;
        nextY = y;
        var toCheck = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // random
        var tmp = 0;
        var current = 0;
        var top = toCheck.length;

        for (var i = top - 1; i > 0; i--) {
            current = Math.floor(Math.random() * i);
            //  console.log(i);
            //  console.log("Current" + current);
            tmp = toCheck[current];
            toCheck[current] = toCheck[i];
            toCheck[i] = tmp;

        }

        for (var i = 0; i < toCheck.length; i++) {

            if (legalMove(x, y, toCheck[i])) {
                board[x][y] = toCheck[i];
                if (x === 8) {
                    if (y === 8) {
                        return true;
                    } else {

                        nextX = 0;
                        nextY = y + 1;
                    }
                } else {
                    nextX = x + 1;
                }
                if (nextCell(nextX, nextY)) {
                    return true;
                }
            }
        }

        board[x][y] = 0;
        return false;
    }


    function legalMove(x, y, current) {

        for (var i = 0; i < 9; i++) {

            if (current === board[x][i]) {
                return false;
            }


        }
        for (var i = 0; i < 9; i++) {
            if (current === board[i][y]) {
                return false;
            }
        }
        var cornerX = 0;
        var cornerY = 0;
        if (x > 2) {
            if (x > 5) {
                cornerX = 6;
            } else {
                cornerX = 3;
            }
        }
        if (y > 2) {
            if (y > 5) {
                cornerY = 6;
            } else {
                cornerY = 3;
            }
        }

        for (var i = cornerX; i < 10 && i < cornerX + 3; i++)
            for (var j = cornerY; j < 10 && j < cornerY + 3; j++)
                if (current == board[i][j])
                    return false;

        return true;
    }

    function makeHoles(holesToMake) {
        var remainingSquares = 81;
        var remainingHoles = holesToMake;

        for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++) {
                var holeChance = remainingHoles / remainingSquares;
                if (Math.random() < holeChance) {
                    board[i][j] = 0;
                    remainingHoles--;
                }
                remainingSquares--;
            }
    }

    var numbers = [];

    function print() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {

                numbers.push(board[i][j]);
                //  console.log(board[i][j]);

            }

        }
    }

    var table = nextBoard(howHard);

    print();
    //  console.log(numbers);
    return numbers;
}
