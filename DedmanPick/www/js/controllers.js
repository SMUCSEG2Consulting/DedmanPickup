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
  $scope.createGame = function createGame(time, location, sport, playerCount){
    games.createGame($scope.time, $scope.location, $scope.sport, $scope.playerCount).then(function(response){
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
.controller('JoinGameCtrl', function($scope, $state, $http, user) {  
  $scope.joinGame = function joinGame(chat){
  $scope.addToGame = user.addUserToGame(chat);
  //$scope.fromFactory = addGameFactory.addGame(chat);
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


.controller('AccountCtrl', function($scope, $state, user) {
  $scope.userName = "John";
  console.log('acct ctrl');

  $scope.getGame = function (){
    //console.log("in get game");
    $scope.gamesJoined = user.getGamesForUser().then(function(response){
      $scope.gamesJoined = response.data;
      //console.log($scope.gamesJoined);
    })

  };

   $scope.getUserData = function(){
    //console.log("user data");
    $scope.users = user.getUserData().then(function(response){
      console.log(response);
      console.log(getUserData);
    })
  };
  $scope.getPreferences = function(){
    //console.log("user data");
    $scope.users = user.getPreferences().then(function(response){
      $scope.preferences = response.data;
      console.log($scope.preferences[0].sport);
      //console.log($scope.users);
    })
  };

  $scope.getUserPreferenceProfile = function(){
    //console.log("user data");
    $scope.users = user.getOneUser().then(function(response){
      users = response.data;
      console.log(users[0]);
      //console.log($scope.users);
    })
  };
  
})

/*
      Login Controller
*/
<<<<<<< HEAD
.controller('LoginCtrl', function($scope, $http) {
=======
//deleted login_functions
.controller('LoginCtrl', function($scope, $http, user) {
>>>>>>> Kate2.00
  console.log('login');
  $scope.users = function getUser()
  {
    console.log("in getUser");
    return user.getUserData();
  }
})








