window.onload = function(){
    // size of grid (n x m)
    var n = 10;
    var m = 10;
    // num of mines
    var mines = 10;

    createGrid();
    document.getElementById('settings').onclick = function() {
        var gridsize = document.getElementsByName('gridsize');
        for(let i = 0; i < gridsize.length; i++){
            if(gridsize[i].checked){
                n = gridsize[i].value;
                m = gridsize[i].value;
                break;
            }
        }

        var minenum = document.getElementsByName('minenum');
        for(let i = 0; i < minenum.length; i++){
            if(minenum[i].checked){
                mines = minenum.value;
                break;
            }
        }

        createGrid();
    }

    function createGrid(){
        for(let row = 0; row < n; row++){
            let r = grid.insertRow(row);
            for (let col = 0; col < m; col++) {
                let cell = r.insertCell(col);
                cell.onclick = function() { 
                    cellClick(this); 
                };
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
            cell.setAttribute("mine","true");
            cell.innerHTML="X";
        }
    }

    function displayAllMines(){
        for(let row = 0; row < n; row++){
            for (let col = 0; col < m; col++) {
                let cell = grid.rows[row].cells[col];
                cell.removeNode()
                if(cell.getAttribute("mine") == "true"){
                    cell.innerHTML = "";
                    cell.className = "mine";
                }
            }
        }
    }

    function gameOver(){
        displayAllMines();
    }

    function cellClick(cell){
        if(cell.getAttribute("mine") == "true"){
            displayAllMines();
            return false;
        } 
    }
}
