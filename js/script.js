let num = [];
let score = 0;

document.addEventListener('DOMContentLoaded' , ()=>{
    const gridDisplay = document.querySelector('.grid');
    const text = document.querySelector('h3');
    const width = 6;

    let started = false;
    let ended = true;

    let template = [

        {name: 'Bishop'}, {name: 'Bishop'}, {name: 'Bishop'},
        {name: 'Bishop'}, {name: 'Bishop'}, {name: 'Bishop'},

        {name: 'King'  }, {name: 'King'  }, {name: 'King'  },
        {name: 'King'  }, {name: 'King'  }, {name: 'King'  },

        {name: 'Knight'}, {name: 'Knight'}, {name: 'Knight'},
        {name: 'Knight'}, {name: 'Knight'}, {name: 'Knight'},

        {name: 'Pawn'  }, {name: 'Pawn'  }, {name: 'Pawn'  },
        {name: 'Pawn'  }, {name: 'Pawn'  }, {name: 'Pawn'  },

        {name: 'Queen' }, {name: 'Queen' }, {name: 'Queen' },
        {name: 'Queen' }, {name: 'Queen' }, {name: 'Queen' },

        {name: 'rook'  }, {name: 'rook'  }, {name: 'rook'  },
        {name: 'rook'  }, {name: 'rook'  }, {name: 'rook'  }
    ];
    let templateCount = 0;

    let tiles = [] ;

    var startBtn = document.getElementById('startBtn');
    startBtn.onclick = function start(){
        if(started === false && ended === true){
            createBoard();
            setTimeout(active, 2000);
            started = true;
            ended = false;
            text.innerText = "Press ESC to exit";
        }
        else{
            return;
        };
    };

    function createBoard() {
        template.sort(() => 0.5 - Math.random());
        for(let i=0; i < width; i++){
            tiles[i] = new Array(width) ;
        };
        for(let i=0; i < width; i++){
            for(let o=0; o < width; o++){
                tile = document.createElement('div');
                tile.classList.add('grid-2');
                    if (i == 0 || i == 2 || i == 4) {
                        tile.classList.add('grid-even');
                    } ;
                    if(i == 1 || i == 3 || i == 5) {
                        tile.classList.add('grid-odd');
                    };
                getPieceClass(tile);
                gridDisplay.appendChild(tile);
                tiles[i][o] = tile;
            };
        };
    };

    function getPieceClass(_tile){
        var pieceClass = template[templateCount].name;
        tile.classList.add(pieceClass); 
        templateCount++;       
    };

    function active(){
        for(let i=0; i < width; i++){
            for(let o=0; o < width; o++){
                tiles[i][o].classList.add('active');
            };
        };
    };

    var hintBtn = document.getElementById('hintBtn');
    hintBtn.onclick = function hint(){
        for(let i=0; i < width; i++){
            for(let o=0; o < width; o++){
                tiles[i][o].classList.remove('active');
            }
        }
        setTimeout(active, 500)
    }

    var endBtn = document.getElementById('endBtn');
    endBtn.onclick = function end(){
        if(ended === false && started === true ){
            tiles = [];
            num = [];
            score = 0;
            templateCount = 0;
            let temp = document.getElementById('score');
            temp.innerHTML = "Score:" + score;
            document.querySelectorAll('.grid-2').forEach(e => e.remove());
            ended = true;
            started = false;
            text.innerText = "Press Enter to start";
        }
        else{
            return;
        };
    };


    
});

document.addEventListener("click" , e=>{
    
    if (e.target.classList.contains('grid-2')) {
        if(e.target.classList.contains('active')){
            if (num.length < 2) {
                e.target.classList.add('rotating')
                e.target.classList.remove('active')
                e.target.classList.remove('correct')
                e.target.classList.remove('wrong')
                num.push(e.target)
                checkOptions()
            }
        }
        else if (e.target.classList.contains('rotating')){
            e.target.classList.add('active')
            e.target.classList.remove('rotating')
            e.target.classList.remove('correct')
            e.target.classList.remove('wrong')
            num.pop(e.target)
        }
    }
    
    function checkOptions(){
        if (num.length === 2 ) {
            let main = num[0]
            let string = validate(main)
            let count = 1
            for(let i = 1 ; i<num.length;i++){
                if (num[i].classList.contains(string)) {
                    count ++
                }
            }

            if (count === 2 ) {
                for(let i = 0; i<num.length;i++){
                    num[i].classList.add('correct')
                }
                setTimeout(resetCheckOPtionTwo, 1000)
            }
            else{
                for(let i = 0; i<num.length;i++){
                    num[i].classList.add('wrong')
                }
                setTimeout(resetCheckOPtion, 1000)
            }
            
            
        }
        if(score == 18){
            alert('well done!');
        }
    }

    function resetCheckOPtion(){
        for(let i = 0; i<num.length;i++){
            num[i].classList.remove('rotating')
            num[i].classList.add('active')
            num[i].classList.remove('wrong')
        }
        num = []
    }

    function resetCheckOPtionTwo(){
        for(let i = 0; i<num.length;i++){
            num[i].classList.remove('rotating')
            num[i].classList.remove('grid-odd')
            num[i].classList.remove('grid-even')
            num[i].classList.remove('correct')
            num[i].classList.add('checked')
            num[i].classList.remove('Bishop');
            num[i].classList.remove('rook');
            num[i].classList.remove('King');
            num[i].classList.remove('Knight');
            num[i].classList.remove('Pawn');
            num[i].classList.remove('Queen');
        }
        score++
        
        let temp = document.getElementById('score')
        temp.innerHTML = "<strong>Score:</strong>" + score;
        num = []
    }

    function validate(main){
            if (main.classList.contains('Bishop')){
                return 'Bishop'
            }
            else if (main.classList.contains('rook')){
                return 'rook'
            }
            else if (main.classList.contains('King')){
                return 'King'
            }
            else if (main.classList.contains('Knight')){
                return 'Knight'
            }
            else if (main.classList.contains('Pawn')){
                return 'Pawn'
            }
            else if (main.classList.contains('Queen')){
                return 'Queen'
            }
    }
})
