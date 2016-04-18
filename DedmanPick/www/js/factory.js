angular.module('starter.factories', [])

.factory('user', function($http)
{
  //console.log("in user factory");
  var users = [];
  return {
    //Iqbal played with this:****************
    deleteUser : function(usr){

      console.log("user: " + usr);
      return $http({
        method: 'DELETE',
        url: 'http://104.236.10.218/public/index.php/deleteUser',
        //data: {usr: usr}
      })},
      
      getUserData : function(){ 
      console.log("in user data");    
      return $http({
        method:'GET',
        url: "http://104.236.10.218/public/index.php/users"
      })
    
    },
     getPreferences : function(){ 
      console.log("in user data");    
      return $http({
        method:'GET',
        url: "http://104.236.10.218/public/index.php/user/IanFontenot67"
      })
    },

      updatePreferences : function(sport){
        var username = "IanFontenot67";
        return $http({
           method: 'POST',
           url: 'http://104.236.10.218/public/index.php/addSportForUser',
           data: {sport: sport, username : username}
        
      })
      
    
    },

    updatePreferences : function(sport){
        return $http({
           method: 'POST',
           url: 'http://104.236.10.218/public/index.php/addSportForUser',
           data: {gameID:sport.id, username : username}
        
            })
    },

    addUserToGame : function(sport){
        var username = "IanFontenot67";
        return $http({
           method: 'POST',
           url: 'http://104.236.10.218/public/index.php/addUserToGame',
           data: {gameID:sport.id, username : username}
        
            })
    },
    getSuggestedGames : function(sport){
        var username = "IanFontenot67";
        return $http({
           method: 'GET',
           url: 'http://104.236.10.218/public/index.php/gamesByUserPref/IanFontenot67',
            })
    },
     getGamesForUser : function(){
        var username = "IanFontenot67";
           return $http({
              method:'GET',
              url: "http://104.236.10.218/public/index.php/gamesForUser/IanFontenot67"
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
})

/*
	login_functions factory
*/

.factory('login_functions', function ($http, $state)
{
  return {
  	
  			////START login request////
  	login_request : function(username, password){

	  	var usr = username;
	  	var pwd = password;
      var session_key;

      //endpoint

        
        //post request
        $http(
          {
               method: 'POST',
               url: 'http://104.236.33.141/public/index.php/login', 
               data: {name: usr, pwd: pwd}
          }
        ).then(

                function(session_key_repsonse)
                {

                  //correct format: 256 character hexidecimal
                  if(session_key_repsonse.data ==  "failed")
                  {
                    console.log("fail to login");
                  }

                  //should check for correct session key format
                  //256 character hexidecimal
                  else
                  {
                    console.log(session_key_repsonse);

                    //retrive session key from response data
                    session_key = session_key_repsonse.data;

                    //save session key to local stoarage
                    window.localStorage.setItem("session_key", session_key);

                    //change state
                    $state.go('tab.account');
                  }

                }
          )
    },//end login_request

    newUser : function(username, password, email){
      var username = username;
      var password = password;
      var email = email;

      //endpoint
      var newUser_url = "http://104.236.10.218/newUser" + username + "/" + password;

      //post request
      $http(
        {
             method: 'POST',
             url: newUser_url,
             data: {username: username, password: password, email: email}
        }
      ).then()
    }//end newUser

  }//end factory return
}
);

/*
	end login_functions factory
*/
  

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
