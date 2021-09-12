class Cell {
    constructor() {
        this.open_ = false;
        this.bomb_ = false;
        this.neighbors_ = 0;
    }

    IsOpen() {
        return this.open_;
    }

    IsBomb() {
        return this.bomb_;
    }

    Open() {
        this.open_ = true;
    }

    SetAsBomb() {
        this.bomb_ = true;
    }

    IncreaseNeighbors(){
        this.neighbors_++;
    }

    Neighbors(){
        return this.neighbors_;
    }
};

class Minesweeper {

    constructor(rows, cols, bombs = 0.1) {
        this.direction_ = [[-1,-1], [-1,0], [-1,1], [0,-1], [0, 1], [1,-1], [1,0], [1,1]];
        // construct a minesweeper with all the randomly placed bombs
        this.cols_ = cols;
        this.rows_ = rows;
        this.bombs_ = new Set();
        this.grid_ = [];
        // O(rows * cols)
        for (var i = 0; i < rows; ++i) {
            this.grid_[i] = [];
            for (var j = 0; j < cols; ++j) {
                this.grid_[i][j] = new Cell();
                if (Math.random() < bombs) {
                    let idx = i * cols + j;
                    this.grid_[i][j].SetAsBomb(); 
                    this.bombs_.add(idx);
                }
            }
        }
        // O(rows*cols) - counting the number of bombs
        this.grid_.forEach((curr, i)=>{
            curr.forEach((x, j)=>{
                if (x.IsBomb()) this.IncreaseNeighbors(i,j);
        })});
    }

    GetIdx(i, j) {
        return i * this.cols_ + j;
    }
    
    GetCoords(idx){
        let ii = Math.floor(idx / this.cols_);
        let jj = idx % this.cols_;
        return [ii, jj];
    }

    IsBomb(i, j) {
        return this.grid_[i][j].IsBomb();
    }

    IsOpen(i, j) {
        return this.grid_[i][j].IsOpen();
    }

    Open(i, j) {
        if(this.IsBomb(i,j)) return [false, this.bombs_];
        var visited = new Set();
        this.DFSOpen(i,j, visited);
        return [true, visited];
    }

    DFSOpen(i,j,visited) {
        if (i < 0 || i >= this.rows_ || j < 0 || j >= this.cols_ || this.IsOpen(i,j) || this.IsBomb(i,j)) return;
        let idx = this.GetIdx(i,j);
        if (visited.has(idx)) return;

        visited.add(idx);
        console.log(`DSOpen(${i}, ${j}, idx = ${idx})`);
        if (this.HasNeighborBombs(i,j)) return;
        this.grid_[i][j].Open();
        this.direction_.forEach((dir)=>{
            let ii = i + dir[0];
            let jj = j + dir[1];
            this.DFSOpen(ii, jj, visited);
        });
    }

    IncreaseNeighbors(i, j) {
        //console.log(`Increase Neighbors called for ${i}, ${j}`);
        this.direction_.forEach((dir)=>{
            let ii = i + dir[0];
            let jj = j + dir[1];
            if (ii < 0 || ii >= this.rows_ || jj < 0 || jj >= this.cols_) { return; }
            this.grid_[ii][jj].IncreaseNeighbors();
        });
    }

    NeighborBombCount(i, j) {
        return this.grid_[i][j].Neighbors();
    }

    
    HasNeighborBombs(i, j) {
        return this.NeighborBombCount(i,j) > 0;
    }
};