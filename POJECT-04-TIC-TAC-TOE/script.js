// ALL DOM ELEMENTS

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const message = document.getElementById('status-message');
const allBoxes = document.getElementsByClassName('box')

// REQUIRED VARIABLES

let board =[null,null,null,null,null,null,null,null,null]
let currentPlayer=1;
let winner = null;

// Functions
// 1- Function to toggle the player turn 

const togglePlayer =()=>{

    if(winner===null){
        currentPlayer=currentPlayer === 1 ? 2 : 1;
        message.innerText=` Player ${currentPlayer} turn.`;
        if(currentPlayer===1){
    
            player1.classList.remove('disable');
             player2.classList.add('disable');
            
        }
        else{
            player2.classList.remove('disable');
            player1.classList.add('disable');
           
        }
    }
}

// 2- Function to update Board UI 

const updateBoard = ()=>{    // In this function value represents the player No, Index represents the box numbers which were clicked 
    board.forEach((value,index)=>{

        if(value !== null){
            document.getElementById(`${index}`).innerHTML= value === 1 ?
            '<i class="fa-solid fa-check tick-icon" ></i> ' :  `<i class="fa-solid fa-xmark cross-icon"></i>`;
    
        };
    })
}

// 3 - Function to match the win sequences

const matchsequence = (location1, location2,location3)=>{

    if(board[location1]=== currentPlayer && board[location2]=== currentPlayer && board[location3]=== currentPlayer   ){
        return true;
    }
    else{
        return false;
    }
}

// 4 - Function to check winner of the game

const checkWinner = ()=>{

    if(matchsequence(0,1,2)){
        winner=currentPlayer;
        message.innerText=`Player ${currentPlayer} won.`
        return;
    }
    if(matchsequence(3,4,5)){
        winner=currentPlayer;
        message.innerText=`Player ${currentPlayer} won.`
        return;
    }
    if(matchsequence(6,7,8)){
        winner=currentPlayer;
        message.innerText=`Player ${currentPlayer} won.`
        return;
    }
    if(matchsequence(0,3,6)){
        winner=currentPlayer;
        message.innerText=`Player ${currentPlayer} won.`
        return;
    }
    if(matchsequence(1,4,7)){
        winner=currentPlayer;
        message.innerText=`Player ${currentPlayer} won.`
        return;
    }
    if(matchsequence(2,5,8)){
        winner=currentPlayer;
        message.innerText=`Player ${currentPlayer} won.`
        return;
    }
    if(matchsequence(0,4,8)){
        winner=currentPlayer;
        message.innerText=`Player ${currentPlayer} won.`
        return;
    }
    if(matchsequence(2,4,6)){
        winner=currentPlayer;
        message.innerText=`Player ${currentPlayer} won.`
        return;
    }
}




// ALL EVENT LISTENERS
// 1 - Event listen to listen click on all boxes

Array.from(allBoxes).forEach((box) =>{
    box.addEventListener('click', e =>{
        if(!box.classList.contains('selected') && winner===null){
            box.classList.add('selected');
            board[box.id]=currentPlayer;
            updateBoard();
            checkWinner();
            togglePlayer();
            
        };
      
    } );
})

updateBoard();