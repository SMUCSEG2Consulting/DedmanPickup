angular.module('starter.services', [])

.factory('Chats', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var testData = [{
    id: 0,
    name: 'Basketball',
    place: 'Dedman',
    time: '12:30 PM'
    //image: 

  }, {
    id: 1,
    name: 'Soccer',
    place:'Intramural field',
    time: '6:00 PM'
    //image: 
  }, {
    id: 2,
    name: 'Tennis',
    place: 'Tennis Courts',
    time: '9:00 AM'
    //image: 
    
  }, {
    id: 3,
    name: 'Ping Pong',
    place: 'Dedman',
    time: '2:45 PM'
    //image: 
  }, {
    id: 4,
    name: 'Pool',
    place: 'Dedman',
    time: '3:30 PM'
    //image:
  },{
    id: 5,
    name: 'Sand Volleyball',
    place: 'Sand Courts',
    time: '8:45 PM'
    //image: 'null'
  }];

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


    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
