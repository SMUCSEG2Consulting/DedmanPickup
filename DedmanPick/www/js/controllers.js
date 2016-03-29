angular.module('starter.controllers', [])


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('CreateGameCtrl', function($scope, $state) {
  $scope.createGame = function createGame(){
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
.controller('JoinGameCtrl', function($scope, $state) {
  
  $scope.joinGame = function joinGame(chat){
  console.log(chat.name);
  console.log('game joined');
  
  $scope.fromFactory = AddGameFactory.addGame(chat);
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
});

module.factory('addGameFactory', function ()
{
  return {
    addGame : function(chat){
      console.log('in factory');}
    }
});


