angular.module('starter.controllers', [])


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $http, Chats) {


 
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
})

.controller('CreateGameCtrl', function($scope, $state) {
  $scope.createGame = function createGame(){
    var params={}
    if($scope.form.place)
    {
        params.place=$scope.form.place;
      }    
      if($scope.form.name)
    {
        params.name=$scope.form.name;
      }    
      if($scope.form.time)
    {
        params.time=$scope.form.time;
      }    
  console.log('game created');
  console.log()
  $state.go('tab.chats');};
})

.controller('JoinGameCtrl', function($scope, $state, addGameFactory) {
  
  $scope.joinGame = function joinGame(chat){
  $scope.fromFactory = addGameFactory.addGame(chat);
  $state.go('tab.account', chat);};
})


.controller('GameDetailCtrl', function($scope, $stateParams, GameData) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('LoginCtrl', function($scope) {
  
  console.log('login');
})

.controller('GameLobbyCtrl', function($scope, $stateParams, GameData) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state, addGameFactory) {
  console.log('acct ctrl');
  $scope.gameData = function getData(){
    console.log('here');
  };


  $scope.gamesJoined = function getGame(){
    return addGameFactory.getGames();
  };
  
})

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



