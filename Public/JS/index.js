function GetRandom(max, min) {
    return Math.random() * (max - min) + min;
}
function GetPercentBombs(){
    return GetRandom(0.05,0.3);
}

var perc_bombs = GetPercentBombs();
var row = 30; // default values
var col = 30; // default values

var minesweeper;
var inactive = false;
var total_bombs = 0;
var remaining_mines = 0;
var popup_open = false;

function about(){
    if (popup_open) return;
    popup_open = true;
    document.getElementById("about").style.display = "flex";
}

function closeAbout(){
    if (!popup_open) return;
    document.getElementById("about").style.display = "none";
    popup_open = false;
}

function openForm() {
  if (popup_open) return;
  document.getElementById("myForm").style.display = "block";
  popup_open = true;
  inactive = true;
}

function closeForm() {
    if (!popup_open) return;
    document.getElementById("myForm").style.display = "none";
    popup_open = false;
    inactive = false;
}

function submitForm()
{ 
    if (!popup_open) return;
    var r = Math.floor(document.getElementById("row").value);
    if (r < 10 || r > 100) {
        alert("Please choose a row value between 10 - 100");
        return;
    }
    var c = Math.floor(document.getElementById("col").value);
    if (c < 10 || c > 100) {
        alert("Please choose a col value between 10 - 100");
        return;
    }
    row=r;
    col=c;
    SetupGrid(row, col, perc_bombs);
    closeForm();
}

function closeGoodNews()
{
    if (!popup_open) return;
    document.getElementById("good").style.display = "none";
    popup_open = false;
}

function closeBadNews()
{
    if (!popup_open) return;
    document.getElementById("bad").style.display = "none";
    popup_open = false;
}

function openGoodNews()
{
  if (popup_open) return;
  document.getElementById("good").style.display = "block";
  popup_open = true;
  inactive = true;
}

function openBadNews(){
    if (popup_open) return;
    document.getElementById("bad").style.display = "block";
    popup_open = true;
    inactive = true;  
}

function restart()
{
    if (popup_open) return;
    perc_bombs = GetPercentBombs();
    SetupGrid(row,col,perc_bombs);
    inactive = false;
}

function restartAfterGoodNews()
{
    closeGoodNews();
    restart();
}

function restartAfterBadNews()
{
    closeBadNews();
    restart();
}



//------------------------------
// Setup the Grid
//------------------------------
function SetupGrid(rows, cols, perc_bombs)
{
    var my_HTML='';
    for (let i = 0; i  < rows; ++i)
    {
        for (let j = 0; j < cols; ++j)
        {
            my_HTML += '<div name="my_cells" class="cell"></div>';
        }
    }
    minesweeper = new Minesweeper(rows,cols, perc_bombs);
    total_bombs = minesweeper.bombs_.size;
    remaining_mines = rows*cols - total_bombs;
    
    console.log(`Remaining Mines = ${remaining_mines}, Total Bombs = ${total_bombs}`);
    document.getElementById('minecount').innerHTML = remaining_mines.toString();
    document.getElementById('bombcount').innerHTML = total_bombs.toString();

    document.getElementById('main').innerHTML = my_HTML;  

    var col_pxl = (window.innerWidth-100) / cols;
    var row_pxl = (window.innerHeight-300) / rows;

    var pxl = Math.min(col_pxl, row_pxl);
    pxl = Math.max(20,pxl);
    $(document.getElementById('main')).css("grid-template-columns", "repeat(" + cols.toString() + "," + pxl.toString() + "px)");
    $(document.getElementById('main')).css("grid-template-rows", "repeat(" + rows.toString() + "," + pxl.toString() + "px)");
}


//-------------------------------------------------
// JQuery for click event
//-------------------------------------------------

const prev_color = "rgb(165, 164, 164)";
const open_color = "rgb(255, 255, 255)";
const bomb_color = "rgb(0,0,0)";
$(document).ready(function(){
    SetupGrid(row,col,GetPercentBombs());
    $(document).on('click', ".cell", function() {
        if (inactive) return;
        var idx = $(".cell").index( this ); // Get the index of the div
        var [i, j] = minesweeper.GetCoords(idx); 

        
        console.log(`Cell clicked ${i}, ${j}`);
        //console.log(`Clicked: ${i}, ${j}`);
        if (minesweeper.IsOpen(i, j))
            return;
    
        var [is_not_bomb, visited] = minesweeper.Open(i,j);
        if (!is_not_bomb) {
            for (let visited_idx of visited)
            {
                $(".cell").eq(visited_idx).css("background-color", bomb_color);
            }
            openBadNews();
        }
        else {
            remaining_mines -= visited.size;
            for (let visited_idx of visited)
            {
                $(".cell").eq(visited_idx).css("background-color", open_color);
                var [ ii, jj ] = minesweeper.GetCoords(visited_idx);
                if (minesweeper.HasNeighborBombs(ii,jj))
                {
                    $(".cell").eq(visited_idx).html(minesweeper.NeighborBombCount(ii, jj));
                }
            }
            document.getElementById('minecount').innerHTML = remaining_mines.toString();
            if  (remaining_mines === 0)
            {
                openGoodNews();
            }
        }
    });
});

