angular.module('tttApp')
	.controller('Repeater',Repeater);

//object constructor
Repeater.$inject = ['$firebaseObject', '$scope'];

function Repeater($firebaseObject, $scope){
// var ref = new Firebase('https://martintttapp.firebaseio.com/gameBoard');
// $scope.gameBoard = $firebaseObject(ref);
// // ref.set({
//   //$scope.gameBoard.boxes = 
//   "boxes":[{"status": null},{"status": null}, {"status": null},
//   {"status": null},{"status": null},{"status": null},
//   {"status": null},{"status": null},{"status": null}];
//  // $scope.gameBoard.$save();
// //});

var ref = new Firebase('https://martintttapp.firebaseio.com');
$firebaseObject(ref).$bindTo($scope, "game");


  var player;
  
  var play1 = "X Team";
  var play2 = "O Team";
  var playTurn=1;
  var gameOver = false;
  $scope.p1Wins = 0;
  $scope.p2Wins = 0;
  $scope.symbols = {
    "1" : "X",
    "-1": "O"
  };

   $scope.markSquare = function(square){
      
      if(!$scope.game) {return;}
     
      if($scope.game.turn != player){
       
        return;
      }
      //markSquare function will mark the proper index with player's value, either 1 or -1
      // var sqVal = $scope.game.board[square];
      // if(sqVal){return;}

      if(gameOver){return;}
    
      // $scope.game.board[square] =  1 : -1;

      // if($scope.game.turn === player){
      //   console.log(player);
      //   if (player = 1) {
      //     $scope.game.board[square] = 1;
      //   } else if (player = -1) {
      $scope.game.board[square] = $scope.game.turn;
        
      $scope.game.turn *= -1;
      $scope.getWinner();
      //} 

      
    };

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

 $scope.getWinner = function(){


    var wc = $scope.winningCombos;
    console.log("length of winning combos: " + wc.length);
    var total = 0;

    for(var i = 0; i < 8; i ++){
        // wc[i] // => [0,1,2]
        
      
      for(var j = 0; j < 3; j++){
          // wc[i][j] // => [0,1,2][0] // => 0             
          // wc[i][j] // => [0,1,2][2] // => 2
          
          var windex = wc[i][j]; // (i = 2, j = 2) // index = 7 // $scope.boxes[index]
          
          total += $scope.game.board[windex];
          // total += $scope.boxes[$scope.winningCombos[i][j]].status
         // console.log($scope.game.board[windex]);
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
  };



  $scope.clearBoard = function(){
     $scope.game.board = [0,0,0,0,0,0,0,0,0];
     console.log($scope.game)
      gameOver = false;
      $scope.game.p1Connect = false;
    $scope.game.p2Connect = false;
  };

  $scope.clearWins = function(){
    $scope.p1Wins = 0;
    $scope.p2Wins = 0;
    
  };
  // $scope.winCount = function(){
  //   if($scope.p1win)
  // }
  $scope.getSymbol = function(square){
    if(!$scope.game) return;
    var sqVal = $scope.game.board[square];
    if(sqVal){ 
      return (sqVal>0) ? "X" : "O";
    }
  };
  $scope.connect = function(){
  //   $scope.game.p2connect;
    if ($scope.game.p1Connect === false) {
      $scope.game.p1Connect = true;     
      player = 1;
    } else if ($scope.game.p2Connect === false) {
      $scope.game.p2Connect=true;
      player = -1;
    }
  //     if($scope.game.p2connect === true){
  //         console.log ("please wait for the next game");
  //       }else {
  //         p2connect = true;
  //         playVal = -1;
  //       }
  //  }
  //  else{
  //       p1connect = true;
  //        playVal = 1;
  //   }
  // }
  }
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
  