angular.module('starter.factories', [])

.factory('user', function($http){

  return {
    //Iqbal played with this:****************
    deleteUser: function(usr){

      console.log("user: " + usr);
      return $http({
        method: 'DELETE',
        url: 'http://104.236.10.218/public/index.php/deleteUser',
        data: {usr: usr}
      })

    }
//*********************************
  }
})

.factory('games', function ($http)
{
  return {

    // this will be a post method
    addGame : function(chat){
      console.log('addGame');
      return $http({
        method:'GET',
        url: "http://dev.ianjjohnson.com/public/index.php/addUserToGame/{gameID}/{username}"
      })
      
    },

// this will be a post method once the end point is changed

    createGame: function(time, location,sport, playerCount){

      
      var hostName = "IanStenbit4"
      console.log("createGame");
      console.log("time: " + time);
      console.log("location: " + location);
      console.log("sport: " + sport);
      console.log("playerCount: " + playerCount);
      console.log("hostName" + hostName);
      
      return $http({
           method: 'POST',
           url: 'http://104.236.10.218/public/index.php/createGame',
           //headers: {'Content-Type': undefined},
           data: {time: time, location: location, sport: sport, playerCount: playerCount, hostName: hostName}
        
      })
      }

    }
  });

/*
// this will be a delete method once the end point is changed
    deleteGame: function(){
      console.log("deleteGame");
      return $http({
        method: 'GET',
        url: "http://dev.ianjjohnson.com/public/index.php/deleteGame/{id}"
      })
    },

      getInfo: function() {
        console.log("getInfo");
        return $http({
          method: 'GET',
          url: "http://dev.ianjjohnson.com/public.index.php/game/{id}"

        })
        
      }


  }
})




//this will be a post method
.factory('users', function (http){
  return{


    //this will be a post method
    addUser: function() {
      console.log("addUser");
        return $http({
          method: 'GET',
          url: "http://dev.ianjjohnson.com/public.index.php/addUserToGame/{gameID}/{username}"
        })
    },

    //post verison
    addUser: function(game_id, username){
      console.log("addUser");

      var addUser_url = 'http://dev.ianjjohnson.com/public.index.php/addUserToGame/' + game_id + "/" + username;
      
      return $http({
        var req = {
           method: 'POST',
           url: addUser_url,
           headers: {'Content-Type': undefined},
           data: { test: 'test' }
        }
      })
      
    },  //end addUser

  
    //this will be a delete method
        deleteUser: function() {
          console.log("deleteUser");
          return $http({
            method: 'GET',
            url: "http://dev.ianjjohnson.com/public.index.php/deleteUserFromGame/{gameID}/{username}"
          })
        },
    
    //delete verison
    deleteUser: function() {
      console.log("deleteUser");
      var deleteUser_url = 'http://dev.ianjjohnson.com/public.index.php/deleteUserFromGame/' + game_id + "/" + username;
    
      $http.delete(deleteUser_url);
    },



//this will be a post method
    createUser: function() {
      console.log("createUser");
      return $http({
        method: 'GET',
        url: "http://dev.ianjjohnson.com/public.index.php/newUser/{name}/{pwd}"
      })
    },

    getUsers: function() {
      console.log("getUsers");
      return $http({
        method: 'GET',
        url: "http://dev.ianjjohnson.com/public.index.php/users"
      })
    },


  }
});

*/
