$(document).ready(function() {

    // Grid Generator
    window.difficulty = function(howHard) {
        var data = getSudoku(howHard);
        // Build page content.

        var elm = $('table');

        elm.remove();

        $('body').append($('<div>').addClass('wrapper')
            .append($('<div>').addClass('col')

                .append(generateSudokuGrid2())));

        // Populate grids with data.
        $('table[class^="sudoku"]').each(function(index, grid) {
            populateGrid($(grid), data);
        });

    }
});

function populateGrid(grid, data) {
    grid.find('td').each(function(index, td) {
        $(td).text(data[index] || '');
    });
}


function generateSudokuGrid2(data) {
    return $('<table>').append(multiPush(9, function() {
        return $('<tr>').append(multiPush(9, function() {
            return $('<td>');
        }));
    })).addClass('sudoku2');
}

function multiPush(count, func, scope) {
    var arr = [];
    for (var i = 0; i < count; i++) {
        arr.push(func.call(scope, i));
    }
    return arr;
}

Array.prototype.shuffle = function() {
    var arr = this.valueOf();
    var ret = [];
    while (ret.length < arr.length) {
        var x = arr[Math.floor(Number(Math.random() * arr.length))];
        if (!(ret.indexOf(x) >= 0)) ret.push(x);
    }
    return ret;
}

Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;

};
