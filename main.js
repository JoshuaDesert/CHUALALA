{

  window.onload = init();

  //object of indexes to limit the scope of play for each playPod
  const objectOfIndexes = {
    triangleOne: [0, 1, 2, 4],
    triangleTwo: [2, 5, 8, 4],
    triangleThree: [6, 7, 8, 4],
    triangleFour: [0, 3, 6, 4],
    squareArrayOne: [0, 1, 3, 4],
    squareArrayTwo: [1, 2, 4, 5],
    squareArrayThree: [4, 5, 7, 8],
    squareArrayFour: [3, 4, 6, 7],
    centerPiece: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  };

  let playPodClass, playpodElement, sitPodClass;
  let triangleOrSqr, indexOfPlayPod, indexOfSitPod;
  let squareOrTriangleArrayIsNotEmpty, activePlayer;

  //these two variables are set to true in the start, to give achoice to players; whoever begins
  var gameBoard, chualalaPlaying, onlyPlayerOnePlaying = true,
    onlyPlayerTwoPlaying = true;
  var PlayerOnePlayPods, playerTwoPlayPods, sitPods, winnerHtmlElement;


  function writeToGameArray(index, writeTrueOrFalse) {

    if (gameBoard.length === 9 && !(index > 8)) gameBoard[index] = writeTrueOrFalse;
    else console.error('There was an Error writing to the GameArray');
  }

  function winnerDisplay() {

    winnerHtmlElement.innerHTML = `*CHUALALA* <br /> ${activePlayer} <br /> WINS!!!! <br />
                                <input type ="button" value = "START A NEW GAME" onclick="init()" /> <br />
                                <input id = 'reset' type ="button" value = "MAIN MENU" onclick="mainMenu()" /> <br />`

    winnerHtmlElement.style.display = 'block';
  }

  function addActivePlayerClass(player) {

    if (player === 'player-1') {
      PlayerOnePlayPods.forEach(item => item.classList.add('activePlayerClass'));
    } else if (player === 'player-2') {
      playerTwoPlayPods.forEach(item => item.classList.add('activePlayerClass'));
    }
  }

  function removeActivePlayerClass(player) {

    if (player === 'player-1') {
      PlayerOnePlayPods.forEach(item => item.classList.remove('activePlayerClass'));
    } else if (player === 'player-2') {
      playerTwoPlayPods.forEach(item => item.classList.remove('activePlayerClass'));
    }
  }

  function returnIndexOfSitPodClass(sitPodClass) {
    let index;
    switch (sitPodClass !== (null || undefined || '')) {
      case sitPodClass === 'top-left':
        index = 0;
        break;
      case sitPodClass === 'top-centre':
        index = 1;
        break;
      case sitPodClass === 'top-right':
        index = 2;
        break;
      case sitPodClass === 'left-centre':
        index = 3;
        break;
      case sitPodClass === 'centre':
        index = 4;
        break;
      case sitPodClass === 'right-centre':
        index = 5;
        break;
      case sitPodClass === 'bottom-left':
        index = 6;
        break;
      case sitPodClass === 'bottom-centre':
        index = 7;
        break;
      case sitPodClass === 'bottom-right':
        index = 8;
        break;
    }
    return index;
  }


  function play(playerPods) {

    for (let pod of playerPods) {
      pod.addEventListener('click', (event) => {

        if (chualalaPlaying) {

          event.preventDefault();
          // let targetPlayerPod = event.target;
          if (pod.classList.item(0) === 'sitPod') {
            sitPodClass = pod.classList.item(1);

            indexOfSitPod = returnIndexOfSitPodClass(sitPodClass);
            /*The index at postion of the sitpod you are moving the playpod to; must be having a value of false in the gameArray and 
            the index of the playpod and the sitpod must both be in the same triangle or square*/
            if ((squareOrTriangleArrayIsNotEmpty === false) &&
              (objectOfIndexes[triangleOrSqr].includes(indexOfSitPod) && objectOfIndexes[triangleOrSqr].includes(indexOfPlayPod))) {

              //replace the class of playPod with the one of sitPod where you have clicked
              const movePodToAnewPlace = () => playpodElement.classList.replace(playPodClass, sitPodClass);

              if (activePlayer === 'player-1' && onlyPlayerOnePlaying === true) {

                movePodToAnewPlace();
                //write 0 to the gamearray at moved to index
                writeToGameArray(returnIndexOfSitPodClass(sitPodClass), 1);
                //write null to the gamearray at the former index
                writeToGameArray(returnIndexOfSitPodClass(playPodClass), null);

                //check for win and update the UI
                if (winner(activePlayer, 1)) {
                  winnerDisplay();
                  chualalaPlaying = false;
                }
                //These lock and open a player
                onlyPlayerOnePlaying = false;
                onlyPlayerTwoPlaying = true;
                //adds the activeplayerclass to the next player
                addActivePlayerClass('player-2');
                //removes the activeplayerclass from the current player
                removeActivePlayerClass(activePlayer);


              } else if (activePlayer === 'player-2' && onlyPlayerTwoPlaying === true) {

                movePodToAnewPlace();
                //write 1 to the gamearray at moved to index
                writeToGameArray(returnIndexOfSitPodClass(sitPodClass), 2);
                //write null to the gamearray at the former index
                writeToGameArray(returnIndexOfSitPodClass(playPodClass), null);

                //check for win and update the UI
                if (winner(activePlayer, 2)) {
                  winnerDisplay();
                  chualalaPlaying = false;
                }
                //These lock and open a player
                onlyPlayerTwoPlaying = false;
                onlyPlayerOnePlaying = true;
                //adds the activeplayerclass to the next player
                addActivePlayerClass('player-1');
                //removes the activeplayerclass from the current player
                removeActivePlayerClass(activePlayer);

              }
            }
            // console.log(triangleOrSqr);
          } else if (pod.classList.item(0) === 'playpod') {
            //this dynamically allocates a player to the activePlayer variable
            activePlayer = pod.classList.item(2);

            //get the class of the playpod
            playPodClass = pod.classList.item(1);
            playpodElement = pod;

            //return which square or triangle clicked on by the class of the sitpod
            triangleOrSqr = returnWhichTriangleOrSquareArray(playPodClass);
            //check to see if that triangle or square is all written to, truethy values or not in the gameBoard.
            squareOrTriangleArrayIsNotEmpty = checkForWrongMove(triangleOrSqr);
            //return the index of the playPod in the gameArray
            indexOfPlayPod = returnIndexOfSitPodClass(playPodClass);
            // console.log(activePlayer);
          }
        }
      }, false)

    }

  }

  //The function which generates SubArrays from the GameArray based on the Array of indexes passed to it.
  function returnArray(indexArray, playernumber = true) {
    const arrayReturned = [];
    gameBoard.forEach((item, index, arr) => {
      let toBePushedItem;

      // we are checking to see if the indexArray entered has items; 
      //it will only execute the 'if' body; when the IndexArray is not empty.
      if (indexArray[index]) {
        toBePushedItem = arr[indexArray[index]]
        arrayReturned.push(toBePushedItem);

        //this portion checks for '0' in the index Array because it will triger a falsy value
        // which will cause an omittion of that item.
      } else if (indexArray[index] === 0) {
        toBePushedItem = arr[indexArray[index]]
        arrayReturned.push(toBePushedItem);
      }
    });
    // check the subarray whether all the items have been written to 1 or 2 in the gamearray
    return arrayReturned.every(item2 => item2 === playernumber);
  }


  function checkForWrongMove(sitPodClassOrSquareOrTriangle) {

    //Search in the Sqare or Traingle Array returned and check for 'true' or 'false'
    // 'true' means all the sitpods in that sqr or trigle have playpods on them, meaning nowhere to play
    // 'false' means there is atleast one sitpod free, or that very one clicked on is free coz the one with a playpod
    // is unclickable, but rather the playpod itself which is on top of it

    if (sitPodClassOrSquareOrTriangle === 'squareArrayOne') {
      return returnArray([0, 1, 3, 4]);
    } else if (sitPodClassOrSquareOrTriangle === 'squareArrayTwo') {
      return returnArray([1, 2, 4, 5]);
    } else if (sitPodClassOrSquareOrTriangle === 'squareArrayThree') {
      return returnArray([4, 5, 7, 8]);
    } else if (sitPodClassOrSquareOrTriangle === 'squareArrayFour') {
      return returnArray([3, 4, 6, 7]);
    } else if (sitPodClassOrSquareOrTriangle === 'triangleOne') {
      return returnArray([0, 1, 2, 4]);
    } else if (sitPodClassOrSquareOrTriangle === 'triangleTwo') {
      return returnArray([2, 5, 8, 4]);
    } else if (sitPodClassOrSquareOrTriangle === 'triangleThree') {
      return returnArray([6, 7, 8, 4]);
    } else if (sitPodClassOrSquareOrTriangle === 'triangleFour') {
      return returnArray([0, 3, 6, 4]);
    } else if (sitPodClassOrSquareOrTriangle === 'centerPiece') {
      return returnArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    } else console.error('That Square or Triangle Array does not exist on the gameArray');

  }


  function returnWhichTriangleOrSquareArray(sitPodClass) {
    // when you click on the sitpod this functions returns the grouping of the position;
    // Either a square of a Triangle, to allow define the scope of the playpod. 
    let squareOrTriangle;

    switch (true) {
      case sitPodClass === 'top-left':
        squareOrTriangle = 'squareArrayOne';
        break;
      case sitPodClass === 'top-centre':
        squareOrTriangle = 'triangleOne';
        break;
      case sitPodClass === 'top-right':
        squareOrTriangle = 'squareArrayTwo';
        break;
      case sitPodClass === 'left-centre':
        squareOrTriangle = 'triangleFour';
        break;
      case sitPodClass === 'right-centre':
        squareOrTriangle = 'triangleTwo';
        break;
      case sitPodClass === 'bottom-left':
        squareOrTriangle = 'squareArrayFour';
        break;
      case sitPodClass === 'bottom-centre':
        squareOrTriangle = 'triangleThree';
        break;
      case sitPodClass === 'bottom-right':
        squareOrTriangle = 'squareArrayThree';
        break;
      case sitPodClass === 'centre':
        squareOrTriangle = 'centerPiece';
        break;
    }
    return squareOrTriangle;
  }

  function winner(player, playernumber) {
    let win;

    //computer Player
    if (player === 'aiPlayer') {

      if ((returnArray([3, 4, 5], playernumber)) ||
        (returnArray([6, 7, 8], playernumber)) ||
        (returnArray([0, 3, 6], playernumber)) ||
        (returnArray([1, 4, 7], playernumber)) ||
        (returnArray([2, 5, 8], playernumber)) ||
        (returnArray([6, 4, 2], playernumber)) ||
        (returnArray([0, 4, 8], playernumber))) {

        win = true;

      }
    }
    //Human Player one
    else if (player === 'player-2') {
      if ((returnArray([3, 4, 5], playernumber)) ||
        (returnArray([6, 7, 8], playernumber)) ||
        (returnArray([0, 3, 6], playernumber)) ||
        (returnArray([1, 4, 7], playernumber)) ||
        (returnArray([2, 5, 8], playernumber)) ||
        (returnArray([6, 4, 2], playernumber)) ||
        (returnArray([0, 4, 8], playernumber))) {

        win = true;
      }
    }
    //Human Player two
    else if (player === 'player-1') {
      if ((returnArray([3, 4, 5], playernumber)) ||
        (returnArray([0, 1, 2], playernumber)) ||
        (returnArray([0, 3, 6], playernumber)) ||
        (returnArray([1, 4, 7], playernumber)) ||
        (returnArray([2, 5, 8], playernumber)) ||
        (returnArray([0, 4, 8], playernumber)) ||
        (returnArray([6, 4, 2], playernumber))) {

        win = true;
      }
    }
    return win;
  }

  function init() {

    gameBoard = [2, 2, 2,
      0, 0, 0,
      1, 1, 1
    ];

    //Grab Playpods for each player and all the sitPods
    PlayerOnePlayPods = document.querySelectorAll('.player-1');
    playerTwoPlayPods = document.querySelectorAll('.player-2');
    sitPods = document.querySelectorAll('.sitPod');
    //winner popUp box
    winnerHtmlElement = document.getElementById('winner');

    chualalaPlaying = true;
    onlyPlayerOnePlaying = true;
    onlyPlayerTwoPlaying = true;
    // the winner popUp box
    winnerHtmlElement.style.display = 'none';


    //Moving a playPod from one sitPod to another by clicking on them
    // And writing to the GameArray; '1' or '2' depending on the position of the playPod and which player
    // Where the PlayPod is; the gameArray at that index is set to '1' or '2'
    // where the PlayPod leaves; the gameArray at that index is set to 'null'
    if (PlayerOnePlayPods) {
      play(PlayerOnePlayPods);
      play(sitPods);
    }

    if (playerTwoPlayPods) {
      play(playerTwoPlayPods);
      play(sitPods);
    }
    restorePlayPodHomeClasses();

  }


  function resetGame() {

    location.reload();
  }

  function restorePlayPodHomeClasses() {
    let cList, id;

    PlayerOnePlayPods.forEach(item => {
      item.classList.remove('activePlayerClass');
      id = item.id;
      cList = item.classList.item(1);

      if (id === 'player1-playpod-1') {
        item.classList.replace(cList, 'bottom-left');
      }
      if (id === 'player1-playpod-2') {
        item.classList.replace(cList, 'bottom-centre');
      }
      if (id === 'player1-playpod-3') {
        item.classList.replace(cList, 'bottom-right');
      }

    });

    playerTwoPlayPods.forEach(item => {
      item.classList.remove('activePlayerClass')
      id = item.id;
      cList = item.classList.item(1);

      if (id === 'player2-playpod-1') {
        item.classList.replace(cList, 'top-left');
      }
      if (id === 'player2-playpod-2') {
        item.classList.replace(cList, 'top-centre');
      }
      if (id === 'player2-playpod-3') {
        item.classList.replace(cList, 'top-right');
      }

    });

  }

  //........................... UI SECTION .........................................

  function mainMenu() {
    //close the game rules section
    document.getElementById('gameRules').style.display = 'none';
    //get back to the start screen
    document.getElementById('startScreen').style.display = 'block';

    const getPlayerMode = document.getElementById('playerMode');

    winnerHtmlElement.style.display = 'none';
    getPlayerMode.style.display = 'none'; //this is to be checked

    chualalaPlaying = false;
  }

  function start(){
    document.getElementById('start').style.display = 'none';
    mainMenu();
  }

  function gameRules() {
    //display the game rules
    document.getElementById('gameRules').style.display = 'block';
    //close the start screen
    document.getElementById('startScreen').style.display = 'none';
  }

  function playbutton() {
    document.getElementById('startScreen').style.display = 'none';
    init();
  }

  function playerMode() {
    //grab which ever player mode selected or clicked on
    const twoplayers = document.getElementById('twoplayers');
    const aiplayer = document.getElementById('aiplayer');
    const multiplayer = document.getElementById('multiplayer');
    const themes = document.getElementById('themes');

    //grab the section in the Dom to insert the html for a selected player mode
    const getPlayerMode = document.getElementById('playerMode');

    const myArrayOfPlayersMode = [twoplayers, aiplayer, multiplayer, themes];

    myArrayOfPlayersMode.forEach((item) => {
      item.addEventListener('click', event => {
        const mode = event.target.value;

        //if its thems button
        if((mode === 'THEMES')){
          getPlayerMode.innerHTML = `<button type="button" id="close" class="closeButton" onclick="mainMenu()"><strong>X</strong></button>
          <br /> ${event.target.value}<br /> coming soon!!`
          document.getElementById('startScreen').style.display = 'none';
          getPlayerMode.style.display = 'block';

        }else if (!(mode === 'TWO PLAYERS')) {
          //any button other than two-Player mode
          getPlayerMode.innerHTML = `<button type="button" id="close" class="closeButton" onclick="mainMenu()"><strong>X</strong></button>
          <br /> ${event.target.value}<br /> mode <br /> coming soon!!`
          document.getElementById('startScreen').style.display = 'none';
          getPlayerMode.style.display = 'block';

        } else {
          //Two_player mode
          document.getElementById('startScreen').style.display = 'none';
          getPlayerMode.style.display = 'none';
          init();
        }


      })
    })

  }
  playerMode();

}