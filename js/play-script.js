const width = 6;
let selected = [];
let score = 0;
let tries = 0;
let tiles = [];
let hints = 4;
//template of all tiles in the game
let template = [
    {name: 'Bishop' , link:'./assets/images/chess-bishop.svg'},
    {name: 'Bishop' , link:'./assets/images/chess-bishop.svg'},
    {name: 'Bishop' , link:'./assets/images/chess-bishop.svg'},
    {name: 'Bishop' , link:'./assets/images/chess-bishop.svg'},
    {name: 'Bishop' , link:'./assets/images/chess-bishop.svg'},
    {name: 'Bishop' , link:'./assets/images/chess-bishop.svg'},

    {name: 'King' , link:'./assets/images/chess-king.svg'},
    {name: 'King' , link:'./assets/images/chess-king.svg'},
    {name: 'King' , link:'./assets/images/chess-king.svg'},
    {name: 'King' , link:'./assets/images/chess-king.svg'},
    {name: 'King' , link:'./assets/images/chess-king.svg'},
    {name: 'King' , link:'./assets/images/chess-king.svg'},

    {name: 'Knight' , link:'./assets/images/chess-knight.svg'},
    {name: 'Knight' , link:'./assets/images/chess-knight.svg'},
    {name: 'Knight' , link:'./assets/images/chess-knight.svg'},
    {name: 'Knight' , link:'./assets/images/chess-knight.svg'},
    {name: 'Knight' , link:'./assets/images/chess-knight.svg'},
    {name: 'Knight' , link:'./assets/images/chess-knight.svg'},

    {name: 'Queen' , link:'./assets/images/chess-queen.svg'},
    {name: 'Queen' , link:'./assets/images/chess-queen.svg'},
    {name: 'Queen' , link:'./assets/images/chess-queen.svg'},
    {name: 'Queen' , link:'./assets/images/chess-queen.svg'},
    {name: 'Queen' , link:'./assets/images/chess-queen.svg'},
    {name: 'Queen' , link:'./assets/images/chess-queen.svg'},

    {name: 'Rook' , link:'./assets/images/chess-rook.svg'},
    {name: 'Rook' , link:'./assets/images/chess-rook.svg'},
    {name: 'Rook' , link:'./assets/images/chess-rook.svg'},
    {name: 'Rook' , link:'./assets/images/chess-rook.svg'},
    {name: 'Rook' , link:'./assets/images/chess-rook.svg'},
    {name: 'Rook' , link:'./assets/images/chess-rook.svg'},

    {name: 'Pawn' , link:'./assets/images/chess-pawn.svg'},
    {name: 'Pawn' , link:'./assets/images/chess-pawn.svg'},
    {name: 'Pawn' , link:'./assets/images/chess-pawn.svg'},
    {name: 'Pawn' , link:'./assets/images/chess-pawn.svg'},
    {name: 'Pawn' , link:'./assets/images/chess-pawn.svg'},
    {name: 'Pawn' , link:'./assets/images/chess-pawn.svg'}
];

document.addEventListener('DOMContentLoaded' , ()=>{

    const startBtn = document.getElementById('startBtn');
    const endBtn = document.getElementById('endBtn');
    const hintBtn = document.getElementById('hintBtn');
    const board = document.getElementById('board');
    let started = false;
    let ended = true;

    //when start button is clicked game starts
    startBtn.onclick = function start(){
        if(started === false && ended === true){
            createBoard();
            setTimeout(endFirstHint, 2000);
            started = true;
            ended = false;
            startBtn.setAttribute('disabled' , 'true');
            endBtn.removeAttribute('disabled');
            hintBtn.removeAttribute('disabled');
        }
        else{
            return;
        };
    };

    //creates the board in start function
    function createBoard() {
        template.sort(() => 0.5 - Math.random());
        for(let i=0; i < (width*width); i++){
            var tile = document.createElement('div');
            tile.setAttribute('class', 'tile');
            tile.setAttribute('style', 'background-image: url(' + template[i].link + ');')
            board.appendChild(tile);
            tiles[i] = tile;
        };
        
    };

    //ends first few seconds of tile hint
    function endFirstHint(){
        for(let i=0; i < (width*width); i++){
            tiles[i].setAttribute('style', 'background-image: none;');
        };
    };

    //shows tile content
    hintBtn.onclick = function hint(){
        if(hints === 0){
            hintBtn.setAttribute('disabled' , 'true');
        }
        else{hints--;}
        
        for(let i=0; i < (width*width); i++){
            if(tiles[i].classList.contains('disable')){
                continue;
            }
            tiles[i].setAttribute('style', 'background-image: url(' + template[i].link + ');')
        };
        setTimeout(endFirstHint, 500)
    }

    //ends game
    endBtn.onclick = function end(){
        if(ended === false && started === true ){
            tiles = [];
            selected = [];
            score = 0;
            tries = 0;
            hints = 4;
            document.querySelectorAll('.tile').forEach(e => e.remove());
            ended = true;
            started = false;
            startBtn.removeAttribute('disabled');
            endBtn.setAttribute('disabled' , 'true');
            hintBtn.setAttribute('disabled' , 'true');
            let scores = document.getElementById('score');
            let triess = document.getElementById('tries');
            scores.innerText = "Score: 0";
            triess.innerText = "Tries: 0";
        }
        else{
            return;
        };
    };
});

document.addEventListener("click" , e=>{

    var index = tiles.indexOf(e.path[0]);
    if (index != -1) {
        if(tiles[index].classList.contains('disable')){
            return;
        }
        else {
            if (tiles[index].classList.contains('rotating')){
                tiles[index].classList.remove('rotating');
                tiles[index].setAttribute('style', 'background-image: none;');
                selected.pop(tiles[index]);
            }
            else{
                if (selected.length < 2) {
                    tiles[index].classList.add('rotating');
                    tiles[index].setAttribute('style', 'background-image: url(' + template[index].link + ');');
                    selected.push(tiles[index]);
                    checkSelected();
                }
            }
        }
    }

    function checkSelected(){
        if (selected.length === 2 ) {
            var answer = compare();
            if (answer === 'match') {
                for(var i = 0 ; i < selected.length ; i++){
                    selected[i].classList.add('correct');
                }
                setTimeout(resetCorrectOPtions, 1000);
            } else {
                for(var i = 0 ; i < selected.length ; i++){
                    selected[i].classList.add('wrong');
                }
                setTimeout(resetWrongOPtions, 1000);
            }
        }
    }

    function resetCorrectOPtions(){
        for(let i = 0 ; i < selected.length ; i++){
            selected[i].classList.remove('rotating');
            selected[i].classList.remove('correct');
            selected[i].classList.add('disable');
            selected[i].setAttribute('style', 'background-image: none;');
        }
        score++
        if(score === 18){
            alert("well done!");
        }
        let scores = document.getElementById('score');
        scores.innerHTML = "Score: " + score;
        selected = []
    }

    function resetWrongOPtions(){
        for(let i = 0 ; i < selected.length ; i++){
            selected[i].classList.remove('rotating');
            selected[i].classList.remove('wrong');
            selected[i].setAttribute('style', 'background-image: none;');
        }
        tries++
        let triess = document.getElementById('tries');
        triess.innerHTML = "tries: " + tries;
        selected = [];
    }

    function compare(){
        var fTemp = selected[0].getAttribute('style');
        var sTemp = selected[1].getAttribute('style');
        var classList = ['bishop', 'king', 'knight' , 'queen', 'pawn' , 'rook']
        var count;
        for(var i = 0 ; i < classList.length ; i++){
            var temp = fTemp.search(classList[i]);
            if(temp != -1){
                count = i;
            }
        }

        var final = sTemp.search(classList[count]);
        if(final != -1){
            return 'match';
        }
        else{
            return 'wrong';
        }
    }

});