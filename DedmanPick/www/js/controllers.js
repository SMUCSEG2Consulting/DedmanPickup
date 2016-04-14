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
      $state.go('tab.chats');
    })};

$scope.newGame = function newGame(){
    
      $state.go('tab.dash');
    };
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

.controller('GameLobbyCtrl', function($scope, $stateParams, GameData, games) {
  //$scope.chat = Chats.get($stateParams.chatId);
  console.log('in send game data');
  //console.log(Chats.get($stateParams.chatId));
  $scope.gameData = function sendGameData(sport, id, location, time){
    console.log('in send game data');
      }
  $scope.createNewGame = function (){
    //console.log("in get game");
    console.log("create new game")
      //console.log($scope.gamesJoined);
  };
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
  $scope.getSuggestedGames = function(){
    //console.log("user data");
    $scope.suggestedGames = user.getSuggestedGames().then(function(response){
      $scope.suggestedGames = response.data;
      console.log($scope.suggestedGames[0].sport);
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
.controller('LoginCtrl', function($scope, $state, $http, login_functions) {
    console.log('(login controller)');
    
    //on click
    $scope.login = function() {
        console.log("User: " + $scope.data.username + ", Password: " + $scope.data.password);
        login_functions.login_request($scope.data.username, $scope.data.password);
    }

    //on click
    $scope.sign_up = function() {
        console.log("go to sign up state");
        //$state.go('tab.signUp');
        
    }
})






