window.onload = init();

//Game Array
const gameBoard = [ true, true, true,
                    false, false, false,
                    true, true, true
                  ];

function writeToGameArray(index, writeTrueOrFalse){
    
  if(gameBoard.length === 9 &&  !(index > 8))gameBoard[index] = writeTrueOrFalse;
  else console.error('There was an Error writing to the GameArray');
}

function returnIndexesForSitPodClasses(sitPodClass){
  let index;
  switch(sitPodClass !== (null || undefined || '')){
    case sitPodClass === 'top-left': index = 0;
    break;
    case sitPodClass === 'top-centre': index = 1;
    break;
    case sitPodClass === 'top-right': index = 2;
    break;
    case sitPodClass === 'left-centre': index = 3;
    break;
    case sitPodClass === 'centre': index = 4;
    break;
    case sitPodClass === 'right-centre': index = 5;
    break;
    case sitPodClass === 'bottom-left': index = 6;
    break;
    case sitPodClass === 'bottom-centre': index = 7;
    break;
    case sitPodClass === 'bottom-right': index = 8;
    break;
  }
  return index;
}


 function init(){

const PlayerOnePlayPods = document.querySelectorAll('.player-1');
const playerTwoPlayPods = document.querySelectorAll('.player-2');
const sitPods = document.querySelectorAll('.sitPod');


function PodTarget(playerPods){
  
  for (let pod of playerPods){
    pod.addEventListener('click', function(event){
      event.preventDefault();
      // let targetPlayerPod = event.target;
      if(pod.classList.item(0) === 'sitPod'){
        sitPodClass = pod.classList.item(1);
        playpodElement.classList.replace(playPodClass,sitPodClass);
        
        //writing to gameArray 'true' after change of class
        writeToGameArray(returnIndexesForSitPodClasses(sitPodClass), true);
        
        console.log(sitPodClass);
      }
      else if(pod.classList.item(0) === 'playpod'){
        playPodClass = pod.classList.item(1);
        playpodElement = pod;
        // console.log(playPodClass);
        
      }

    })
  }
}

PodTarget(PlayerOnePlayPods);
PodTarget(playerTwoPlayPods);
PodTarget(sitPods);



    }



      

//      //This is to be used in the rest or restart or browser reload to check 
//      // if sitPods are set to True and move the playPods to Home rows thus reseting the Game.
//         const playerOne = gameBoard[0] && gameBoard[1] && gameBoard[2];
//         const playerTwo = gameBoard[6] && gameBoard[7] && gameBoard[8];


// //............................ Winning Variables Section....................................
//         

//       
// function huPlayerOne(){
//                   let winOrLose;

//                if((returnArray([3,4,5]) === true) || 
//                   (returnArray([0,1,2]) === true) ||
//                   (returnArray([0,3,6]) === true) ||
//                   (returnArray([1,4,7]) === true) ||
//                   (returnArray([2,5,8]) === true) || 
//                   (returnArray([0,4,8]) === true) ||
//                   (returnArray([6,4,2]) === true)){
    
//                    winOrLose = true;
//                   }else {
//                     winOrLose = false;
//                   }
//               return winOrLose;
//             }
    
//           function huPlayerTwo(){
//               let winOrLose;
    
//            if((returnArray([3,4,5]) === true) || 
//               (returnArray([6,7,8]) === true) ||
//               (returnArray([0,3,6]) === true) ||
//               (returnArray([1,4,7]) === true) ||
//               (returnArray([2,5,8]) === true) || 
//               (returnArray([6,4,2]) === true) ||
//               (returnArray([0,4,8]) === true)){
    
//                winOrLose = true;
//               }else {
//                 winOrLose = false;
//               }
//           return winOrLose;
//             }

//         //The function which generates SubArrays from the GameArray
//         function returnArray(indexArray){
//           const arrayReturned = [];
//           gameBoard.forEach((item,index,arr)=> {
//                      let toBePushedItem;
              
//               // we are checking to see if the indexArray entered has items; 
//               //it will only execute the 'if' body; when the IndexArray is not empty.
//               if(indexArray[index]){
//                   toBePushedItem = arr[indexArray[index]]
//                   arrayReturned.push(toBePushedItem);
      
//               //this portion checks for '0' in the index Array because it will triger a falsy value
//               // which will cause an omittion of that item.
//               }else if(indexArray[index] === 0) {
//                   toBePushedItem = arr[indexArray[index]]
//                   arrayReturned.push(toBePushedItem);
//               }
//           });
//           return arrayReturned.every(item => item === true);
//       }
// //............................END of Winning Variables ....................................

// //............................ Checking wrong move Section....................................

//       //If this functions returns True; then it is a wrong Move, but if it returns False; then it is not a wrong move
//        const triangleOne = returnArray([0,1,2,4]);
//        const triangleTwo = returnArray([2,5,8,4]);
//        const triangleThree = returnArray([6,7,8,4]);
//        const triangleFour = returnArray([0,3,6,4]);
       
//        const squareArrayOne = returnArray([0,1,3,4]);
//        const squareArrayTwo = returnArray([1,2,4,5]);
//        const squareArrayThree = returnArray([4,5,7,8]);
//        const squareArrayFour = returnArray([3,4,6,7]);

//        const centerPiece = returnArray([0,1,2,3,4,5,6,7,8]);


// //............................End of Checking wrong move Section....................................
        
//         const  [gbx1,gbx2,,gbx3,gbx4] = gameBoard;
//         const gameBoxTwo = [];
//         const gameBoxThree = [];
//         const gameBoxFour = [];

