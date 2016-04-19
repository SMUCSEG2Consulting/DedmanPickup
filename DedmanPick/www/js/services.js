angular.module('starter.services', [])

.factory('Chats', function($http) {

  var chats =[];

  return {
    all: function() {

      //var getGames_url = 'http://dev.ianjjohnson.com/public/index.php/games';
      var getGames_url = 'http://104.236.10.218/public/index.php/games';
      

      return $http({

        method: 'GET',
        url: getGames_url
        //crossDomain: true

      }).then(function(response){
        chats = response.data;
        return response.data;
      })

      //convert chats to correct format and then return
      //...convert...
      //return chats;

      return testData;
    },

    getGameData: function(chatId){
      //console.log(chats[chatId]);
      console.log('in getGameData');
      return chats[chatId-1];
    },

    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        console.log(chats[i].sport);
        if (chats[i].id === parseInt(chatId)) {
          console.log('here');
          return chats[i];
        }
      }
      return null;
    }
  };
});
