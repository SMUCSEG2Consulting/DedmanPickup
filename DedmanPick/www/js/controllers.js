angular.module('starter.controllers', ['starter.factories'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('CreateGameCtrl', function($scope, $state, games) {
  $scope.createGame = function createGame(){

//ask matthew about this
    games.createGame().then(function(response){
      console.log(response);
    })
    /*var params={}
    if($scope.form.abv)
    {
        params.abv=$scope.form.abv;
      }    
      if($scope.form.name)
    {
        params.name=$scope.form.name;
      }    
      if($scope.form.ibu)
    {
        params.ibu=$scope.form.ibu;
      }    */
  console.log('game created');
  console.log()
  $state.go('tab.chats');};
})

.controller('JoinGameCtrl', function($scope, $state, games, users) {

   games.getGames().then(function(response){
    console.log(response);
    //response obejct conains all info about games
    chats= response;


  })
   
  $scope.joinGame = function joinGame(chat){
  console.log(chat.name);
  console.log('game joined');
  
  $scope.fromFactory = games.addGame(chat);
  $state.go('tab.account', chat);};
})


.controller('GameDetailCtrl', function($scope, $stateParams, GameData) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('LoginCtrl', function($scope) {
  
  $scope.reroute = function (e) {
   $state.go('tab.dash');
  };
})

.controller('GameLobbyCtrl', function($scope, $stateParams, GameData) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  //console.log(chat.name);
  $scope.settings = {
    enableFriends: true
  };
})



