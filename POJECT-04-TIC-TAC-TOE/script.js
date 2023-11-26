// ALL DOM ELEMENTS

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const message = document.getElementById('status-message');
const allBoxes = document.getElementsByClassName('box')

// REQUIRED VARIABLES

let board =[null,null,null,null,null,null,null,null,null,]
let currentPlayer=1;

// Functions
// 1- Function to toggle the player turn 

const togglePlayer =()=>{

    currentPlayer=currentPlayer === 1 ? 2 : 1;
    message.innerText=` Player ${currentPlayer} turn.`;
    if(currentPlayer===1){

        player1.classList.remove('disable');
         player2.classList.add('disable');
         console.log("Disable class added in player 2");
    }
    else{
        player2.classList.remove('disable');
        player1.classList.add('disable');
        console.log("Disable class added in player 1");
    }

}
// ALL EVENT LISTENERS
// 1 - Event listen to run after click on box

Array.from(allBoxes).forEach((box) =>{
    box.addEventListener('click', e =>{
        togglePlayer();
    } );
})
