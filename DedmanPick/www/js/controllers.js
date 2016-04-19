angular.module('starter.controllers', ['starter.factories'])


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $http, Chats) {

console.log('in chats');
 
  var chats = Chats.all();

  chats.then(

        function successCallback(data){
          console.log(data);
          $scope.chats = data;
        }

      )

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };


  //console.log(Chats.get($stateParams.chatId));
  $scope.gameData = function sendGameData(sport, id, location, time){
    console.log('in send game data');
      }
})

.controller('CreateGameCtrl', function($scope, $state, games) {
  $scope.createGame = function createGame(time, location, sport){
    games.createGame($scope.time, $scope.location, $scope.sport).then(function(response){
      console.log(response);
    })
  console.log('game created');
  console.log()
  $state.go('tab.chats');};
})

.controller('JoinGameCtrl', function($scope, $state, addGameFactory) {
  
  $scope.joinGame = function joinGame(chat){
  $scope.fromFactory = addGameFactory.addGame(chat);
  $state.go('tab.account', chat);};
})

.controller('GameLobbyCtrl', function($scope, $stateParams, GameData) {
  $scope.chat = Chats.get($stateParams.chatId);
  console.log('in send game data');
  //console.log(Chats.get($stateParams.chatId));
  $scope.gameData = function sendGameData(sport, id, location, time){
    console.log('in send game data');
      }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  
  //console.log($stateParams.chatId);
  $scope.chat = Chats.getGameData($stateParams.chatId);
  console.log($scope.chat);
  //console.log(Chats[$stateParams.chatId]);
  //console.log(Chats.get($stateParams.chatId));
})

.controller('AccountCtrl', function($scope, $state, addGameFactory) {
  //console.log('acct ctrl');
  $scope.gameData = function getData(){
    console.log('here');
  };


  $scope.gamesJoined = function getGame(){
    return addGameFactory.getGames();
  };
  
})


/*
      Login Controller
*/
.controller('LoginCtrl', function($scope, $state, $http, login_functions) {
    console.log('(login controller)');
    
    //on click
    $scope.login = function() {

      //if( !($scope.data.username == undefined || $scope.data.password == undefined) ){

        //tmp display username and password enterd
        console.log("User: " + $scope.data.username + ", Password: " + $scope.data.password);

        //call login function to make request
        login_functions.login_request(  $scope.data.username, $scope.data.password  )

        .then(
                //incorrect password
                function() 
                {
                    //$state.go('tab.account');
                    console.log("success");

                    //change state
                    $state.go('tab.account');
                }, 

                //correct pasword
                function() 
                {
                     //$scope.failed_login_attempt_message = '<font size="3" color="red">Incorrect Username or Password</font><br><a href="#" ng-click = "email_new_password()">forgot password?</a>';
                     $scope.failed_login_attempt_message = '<font size="3" color="red">Incorrect Username or Password</font>';
                }
              );
      //}
    }

    //on click
    $scope.sign_up_state = function() {
        console.log("change to sign up");

        $state.go('sign_up');
        
    }

        //on click
    $scope.email_new_password = function() {
        console.log("no email provided");
        
    }
})


/*
      Sign up Controller
*/
.controller('sign_up_Ctrl', function($scope, $state, $http, sign_up_functions) {
    console.log('(sign_up_Ctrl controller)');
    
    //on click
    $scope.sign_up = function() {

      //if( $scope.data.username != undefined && $scope.data.password != undefined && $scope.data.email != undefined)

        //tmp display username and password enterd
        console.log("User: " + $scope.data.username + ", Password: " + $scope.data.password + ", Email: " + $scope.data.email);

        //call login function to make request
        sign_up_functions.newUser(  $scope.data.username, $scope.data.password, $scope.data.email  )

        .then(
                //incorrect password
                function() 
                {
                    console.log("success");

                    //change state
                    $state.go('tab.account');
                }, 

                //correct pasword
                function() 
                {
                      console.log("error");

                     $scope.failed_login_attempt_message = '<font size="3" color="red">Please fill out the feilds correctly</font>';
                }
              );
    }

    //on click
    $scope.login_state = function() {
        console.log("change to login");

        $state.go('login');
        
    }
})
/*
    note:
            move factory to factory.js or services.js
                                                        */

.factory('addGameFactory', function ()
{
  var gamesJoined = [];
  return {
    addGame : function(chat){
      console.log("add game: " + chat.sport);
      gamesJoined.push(chat);
    },

    getGames : function(){
      return gamesJoined;
    }
}
});



