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

//Iqbal played with this:****************
.controller('DeleteUserCtrl', function($scope, $state, user) {
  $scope.deleteUser = function deleteUser(usr){
    user.deleteUser($scope.usr).then(function(response){
      console.log(response);
    })
    console.log('deleted user');
    console.log()
    $state.go('tab.chats');};
  })
//***************************************
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
.controller('LoginCtrl', function($scope, $http, login_functions) {
    console.log('(login controller)');
    
    //on click
    $scope.login = function() {
        console.log("User: " + $scope.data.username + ", Password: " + $scope.data.password);
      
        login_functions.login_request($scope.data.username, $scope.data.password);
        
        /*
          todo:
                change state based on login success
                                                    */
    }
})


/*
    note:
            maybe move factory to factory.js or services.js
                              VVV
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



