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

let rows = 4;
let cols = 4;

let grid = Array(rows).fill().map(() => Array(cols).fill(0));

grid[0][0] = 1;
grid[0][1] = 1;
grid[0][2] = 1;
grid[1][0] = 1;
grid[1][2] = 1;
grid[2][0] = 1;
grid[2][1] = 1;
grid[2][2] = 1;

updated_grid = update_grid(grid,rows,cols);
