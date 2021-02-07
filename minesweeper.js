window.onload = function(){
    // size of grid (n x m)
    var n;
    var m;
    // num of mines
    var mines;

    const messages = {
        win: 'You Win!',
        lose: 'You Lose!',
    };

    var settingsButton = document.getElementById('settings');
    var gridsize_radio = document.getElementsByName('gridsize');
    var minenum_radio = document.getElementsByName('minenum');
    var message = document.getElementById('message');


    settingsButton.onclick = function() {
        for(let i = 0; i < gridsize_radio.length; i++){
            if(gridsize_radio[i].checked){
                n = gridsize_radio[i].value;
                m = gridsize_radio[i].value;
                continue;
            }
            gridsize_radio[i].disabled = "true";
        }
        
        for(let i = 0; i < minenum_radio.length; i++){
            if(minenum_radio[i].checked){
                mines = minenum_radio[i].value;
                continue;
            }
            minenum_radio[i].disabled = "true";
        }

        settingsButton.style.display = 'none';
        settingsButton.value = '';
        createGrid();
    }

    function createGrid(){
        for(let row = 0; row < n; row++){
            let r = grid.insertRow(row);
            for (let col = 0; col < m; col++) {
                let cell = r.insertCell(col);
                cell.onclick = function() { cellClick(this); };
                let mine = document.createAttribute("mine");       
                mine.value = "false";             
                cell.setAttributeNode(mine);
            }
        }
        placeMines();
    }

    function placeMines(){
        // Place board size amount of mines
        for (var i = 0; i < mines; i++) {
            let row = Math.floor(Math.random() * n);
            let col = Math.floor(Math.random() * m);
            let cell = grid.rows[row].cells[col];
            if(cell.getAttribute("mine") == "true")
                i--;
            cell.setAttribute("mine","true");
            cell.innerHTML="X";
        }
    }

    function displayAllMines(){
        for(let row = 0; row < n; row++){
            for (let col = 0; col < m; col++) {
                let cell = grid.rows[row].cells[col];
                if(cell.getAttribute("mine") == "true"){
                    cell.innerHTML = "";
                    cell.className = "mine";
                }
            }
        }
    }

    function getAdjacentMineCount(cell){
        let rowIndex = cell.parentNode.rowIndex;
        let colIndex = cell.cellIndex;
        let rowStart = Math.max(rowIndex-1, 0);
        let rowEnd = Math.min(rowIndex+1, n-1);
        let colStart = Math.max(colIndex-1, 0);
        let colEnd = Math.min(colIndex+1, m-1);
        let count = 0;
        for(let r = rowStart; r <= rowEnd; r++){
            for(let c = colStart; c <= colEnd; c++){
                let cell = grid.rows[r].cells[c];
                if(cell.getAttribute("mine") == "true")
                    count++;
            }
        }
        return count;
    }

    function gameWon(){
        for(let row = 0; row < n; row++){
            for (let col = 0; col < m; col++) {
                let cell = grid.rows[row].cells[col];
                if(cell.getAttribute("mine") == "true")
                    continue;
                if(cell.className != "clicked")
                    return false;
            }
        }
        return true;
    }

    function cellClick(cell){
        // If user clicks on a mine, then display all mines and game is over
        if(cell.getAttribute("mine") == "true"){
            displayAllMines();
            displayAllCells();
            message.innerHTML = messages.lose.fontcolor("red");
            return false;
        }

        let count = getAdjacentMineCount(cell);
        cell.className = "clicked";
        cell.innerHTML = count;
        if(count === 0)
            displayAllEmptyCells();

        if(gameWon()){
            displayAllMines();
            message.innerHTML = messages.win.fontcolor("green");
        }

        return false;
    }

    function displayAllCells(){
        for(let row = 0; row < n; row++){
            for (let col = 0; col < m; col++) {
                let cell = grid.rows[row].cells[col];
                if(cell.getAttribute("mine") == "true")
                    continue;
                let count = getAdjacentMineCount(cell);
                cell.className = "clicked";
                cell.innerHTML = count;
            }
        }
    }

    function displayAllEmptyCells(){
        for(let row = 0; row < n; row++){
            for (let col = 0; col < m; col++) {
                let cell = grid.rows[row].cells[col];
                let count = getAdjacentMineCount(cell);
                if(count === 0){
                    cell.className = "clicked";
                    cell.innerHTML = count;
                }
            }
        }
    }
}
