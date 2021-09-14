# Minesweeper-HTML
Minesweeper Game in HTML, Javascript and CSS, with a little bit of NodeJS

The original intention of programming this was to learn HTML, CSS and NodeJS. NodeJS is strictly not required to use this HTML. However, it is easily possible to setup a server quickly and run the system.

# Usage
Spin off the server (located at port 1000) using the following command:

<pre><code>node app.js</code></pre>

# How to play
A left click will reveal a spot. If the spot has a bomb, you lose. If the spot is empty, the spots will be revealed until you run over a spot with numbers. If the spot has a number, it gets revealed by itself. A number on the spot indicates that there are bombs in the vicinity. A number of 1 means that there's exactly 1 bomb in the neighbouring cells. Similarly, the number of 2 indicates that there are 2 bombs in the neighbouring cells. A cell could have a max number of 8 - as it has 8 neighbours. 

The player can right click to "flag" the cell as a potential bomb. This flagging is purely for reference, and doesn't affect the game outcome. Once you have flagged a cell, you can right-click on it again to remove the flag. Once a cell is flagged, it can't be left-clicked on. However, it may be reveled if it is a part of "empty" cells being revealed.

A player can select a board size (with rows and columns both running between 10 and 100). A player can also restart the same board.

The game shows a little bit of stats - total number of bombs, remaining spots that could be revealed and total flagged mines.

Once all the spots are revealed, you win!

# Developer Info
Prabhakar Regmi

Software Developer (since 2012)
