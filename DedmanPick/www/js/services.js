angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Basketball',
    place: 'Dedman',
    time: '12:30 PM'
  
  }, {
    id: 1,
    name: 'Soccer',
    place:'Intramural field',
    time: '6:00 PM'
  }, {
    id: 2,
    name: 'Tennis',
    place: 'Tennis Courts',
    time: '9:00 AM'
    
  }, {
    id: 3,
    name: 'Ping Pong',
    place: 'Dedman',
    time: '2:45 PM'
  }, {
    id: 4,
    name: 'Pool',
    place: 'Dedman',
    time: '3:30 PM'
  },{
    id: 5,
    name: 'Sand Volleyball',
    place: 'Sand Courts',
    time: '8:45 PM'
  }];

  return {
    all: function() {
      return chats;
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
