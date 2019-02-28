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

let rows = 4;
let cols = 4;

grid = Array(rows).fill().map(() => Array(cols).fill(0));

grid[0][0] = 1;
grid[0][1] = 1;
grid[0][2] = 1;
grid[1][0] = 1;
grid[1][2] = 1;
grid[2][0] = 1;
grid[2][1] = 1;
grid[2][2] = 1;
