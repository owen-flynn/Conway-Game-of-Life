var fill_random = (rows,cols) => {
    let grid = Array(rows).fill().map(() => Array(cols).fill(0));
    var row;
    var col;

    for(row = 0; row < rows; row++) {
        for(col = 0; col < cols; col++) {
            val = Math.floor((Math.random() * 2) + 1);
            if(val == 1) {
                grid[row][col] = 1;
            }
        }
    }

    return grid;
};

var exists = (row,col,rows,cols) =>
    row < rows && row >= 0 && col < cols && col >= 0;

var count_columns = (grid,row,col,rows,cols) => {
    let live_neighbours = 0;

    for(i = row - 1; i <= row + 1; i++) {
        if(exists(i,col,rows,cols)) {
            live_neighbours += grid[i][col];
        }
    }

    return live_neighbours;
};

var count_live_neighbours = (grid,row,col,rows,cols) => {
    let live_neighbours = 0;

    if(exists(row-1,col,rows,cols)) {
        live_neighbours += grid[row-1][col];
    }

    if(exists(row+1,col,rows,cols)) {
        live_neighbours += grid[row+1][col];
    }

    live_neighbours += (count_columns(grid,row,col-1,rows,cols) +
    count_columns(grid,row,col+1,rows,cols));

    return live_neighbours;
};

var set_square = (grid,row,col,live_neighbours) => {
    let value = grid[row][col];

    if((value == 1 && (live_neighbours == 2 || live_neighbours == 3)) ||
        (value == 0 && (live_neighbours == 3))) {
            return 1;
    }

    return 0;
};

var update_grid = (grid,rows,cols) => {
    let new_grid = Array(rows).fill().map(() => Array(cols).fill(0));
    var row;
    var col;

    for(row = 0; row < rows; row++) {
        for(col = 0; col < cols; col++) {
            let live_neighbours = count_live_neighbours(grid,row,col,rows,cols);
            new_grid[row][col] = set_square(grid,row,col,live_neighbours);
        }
    }

    return new_grid;
};

var draw_grid = (grid,rows,cols) => {
    var canvas = document.getElementById("my_canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 800, 800);

    var row;
    var col;

    var x = 2;
    var y = 2;

    for(row = 0; row < rows; row++) {
        for(col = 0; col < cols; col++) {
            if(grid[row][col] == 1) {
                ctx.fillStyle = "#008000";
                ctx.fillRect(row * x, col * y, 2,2);
            }
        }
    }
};

var run = () => {
    draw_grid(grid,rows,cols);
    grid = update_grid(grid,rows,cols);
    requestAnimationFrame(run);
}

let rows = 400;
let cols = 400;

let grid = fill_random(rows,cols);
run();
