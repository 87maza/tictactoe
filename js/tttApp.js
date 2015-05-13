angular.module('tttApp')
	.controller('Repeater',Repeater);

//object constructor
Repeater.$inject = ['$firebaseObject'];

function Repeater($scope){
  var play1 = 1;
  var play2 = -1;
  var playTurn=1;
  var gameOver = false;
  $scope.p1Wins = 0;
  $scope.p2Wins = 0;
  $scope.symbols = {
    "1" : "X",
    "-1": "O"
};
	$scope.boxes = [{status: null},{status: null}, {status: null},
	{status: null},{status: null},{status: null},
	{status: null},{status: null},{status: null}];

   $scope.markSquare = function(index){
   		//markSquare function will mark the proper index with player's value, either 1 or -1
   		if(($scope.boxes[index].status === null) && !gameOver){
            //if statment above will allow null boxes to be occupied with either players' value

            //if statement below will initiate alternating turns
               $scope.boxes[index].status = playTurn;
   				if (playTurn ===1){
   					playTurn = -1;
            $scope.getWinner();
   				} else {
            playTurn=1;
            $scope.getWinner();
          }
      };
    }

   			//else statment intiates continuous switch until all square are filled
   	
    $scope.winningCombos = [
    //winning combos in array of arrays, needs a nested for loop for a call
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ];

 $scope.getWinner = function(index){
    var wc = $scope.winningCombos;
    var total = 0;

    for(var i = 0; i < 8; i ++){
        // wc[i] // => [0,1,2]
        
      
      for(var j = 0; j < 3; j++){
          // wc[i][j] // => [0,1,2][0] // => 0             
          // wc[i][j] // => [0,1,2][2] // => 2
          
          var windex = wc[i][j]; // (i = 2, j = 2) // index = 7 // $scope.boxes[index]
          
          total += $scope.boxes[windex].status;
          // total += $scope.boxes[$scope.winningCombos[i][j]].status
          
      }
      if (total === 3){
          $scope.p1Wins += 1;
          // player 1 wins
          console.log("player 1 wins");
          console.log("total wins" + $scope.p1Wins);
          gameOver = true;
      } 
      else if (total === -3){
          $scope.p2Wins += 1;
          // p2 wins
          console.log("player 2 wins");
          console.log("total wins" + $scope.p2Wins);
          gameOver = true;
      }
      total = 0; //total sets wins to zero, no double counts  
    }
  }
  $scope.clearBoard = function(){
     $scope.boxes = [{status: null},{status: null}, {status: null},
      {status: null},{status: null},{status: null},
      {status: null},{status: null},{status: null}];
      gameOver = false;
  }
  $scope.clearWins = function(){
    $scope.p1Wins = 0;
    $scope.p2Wins = 0;
  }
  // $scope.winCount = function(){
  //   if($scope.p1win)
  // }
}

function languages(instruct){
var e = document.getElementById("instruct");
var f = document.getElementById("instructeng");
  if(e.style.display=='block'){
     f.style.display = 'block';
      e.style.display = 'none';
  }
  else{
    
       e.style.display = 'block';
    f.style.display = 'none';
    }
}


/*To do list:

3. CSS / add Icons, Instructions
4. Add buttons for english instructions
The object of Tic Tac Toe is to get three in a row. You play on a three by three game board. The first player is known as X and the second is O. Players alternate placing Xs and Os on the game board until either oppent has three in a row or all nine squares are filled.
5. Add butt
To ASK:
2. Player ICON toggle function
3. When to 
*/
  