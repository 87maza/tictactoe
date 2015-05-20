angular.module('tttApp')
	.controller('Repeater',Repeater);

//object constructor
Repeater.$inject = ['$firebaseObject', '$scope'];

function Repeater($firebaseObject, $scope){
//Controller as firebaseobject, $scope is used for 3way binding instead of using $save

var ref = new Firebase('https://martintttapp.firebaseio.com');
$firebaseObject(ref).$bindTo($scope, "game");
//reference object

var player;
//player variable used for turnkeeping online click function
var gameOver = false;
//gameOver switch for win count and stopping after a winner declared
$scope.p1Wins = 0;
$scope.p2Wins = 0;
//player wins function not ready, need to add another button


 $scope.markSquare = function(square){
    //markSquare function will mark the proper index with player's value, either 1 or -1
    if(!$scope.game) {return;}
   //if not in scope.game get out of function
    if($scope.game.turn != player){return;}
     //if statement matches firebase var turn with local var turn to determine whose turn it is online.  it prevents double-play free for all online  
    if(gameOver){return;}
    //once winner declared, no one gets to mark on board
    $scope.game.board[square] = $scope.game.turn;
    $scope.game.turn *= -1;
    $scope.getWinner();
    //turn switch and scan for winner after every turn.
  };

    $scope.winningCombos = [
    //winning combos in array of arrays, needs a nested for loop isolate winning numbers
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ];

 $scope.getWinner = function(){
    //win logic
    var wc = $scope.winningCombos;
    //shortened so i dont have to type
    var total = 0;
    //total to gather up winning indices
    for(var i = 0; i < 8; i ++){
        // wc[i] // => [0,1,2]
        //first for loop used for 8 possible winning combos
      
      for(var j = 0; j < 3; j++){
          // wc[i][j] // => [0,1,2][0] // => 0             
          // wc[i][j] // => [0,1,2][2] // => 2
          //second for loop used for exact location in winning combos array index
          
          var windex = wc[i][j]; 
          //winning index numbers from nexted for loops
          
          total += $scope.game.board[windex];
         // total += $scope.boxes[$scope.winningCombos[i][j]].status
         // console.log($scope.game.board[windex]);
      }
      if(total === 3){
        // winner declared after 3 points, 3 in a row
          $scope.p1Wins += 1;
          //win counter incrementer
          alert("player 1 wins");
          gameOver = true;
      } 
      else if (total === -3){
          $scope.p2Wins += 1;
          alert("player 2 wins");
          gameOver = true;
      }
      total = 0; //total sets wins to zero, no double counts  
    }
  };



  $scope.clearBoard = function(){
     $scope.game.board = [0,0,0,0,0,0,0,0,0];
      gameOver = false;
      $scope.game.p1Connect = false;
    $scope.game.p2Connect = false;
  };
  //clears board, sets board to zeroes, starting state/resets player connection

  $scope.clearWins = function(){
    $scope.p1Wins = 0;
    $scope.p2Wins = 0;
  };
  // clears win board, need to tie this function to a button
  $scope.getSymbol = function(square){
    if(!$scope.game) return;
    var sqVal = $scope.game.board[square];
    if(sqVal){ 
      return (sqVal>0) ? "X" : "O";
      //ternary statement that states if square value is greater than zero, use x. else use o
    }
  };
  //allows for function switch -1 and 1's to x and o's
 
  $scope.connect = function(){
    if ($scope.game.p1Connect === false){
      $scope.game.p1Connect = true;     
      player = 1;
    } else if ($scope.game.p2Connect === false){
      $scope.game.p2Connect=true;
      player = -1;
    }
  //connect button that allows for online play assigning priority to first click and using a local variable to assign online player to either x or o permanently.
  }
}
//end of controller function

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
//language switch toggle vanila javascript

/*To do list:
1. Styling
2. ADD round counter
3. Create better Draw Logic
4. Alert user to announce if its their turn
5. Timer
6. Responsive Design
*/
  