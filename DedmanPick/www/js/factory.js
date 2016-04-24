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
        url: "http://104.236.10.218/public/index.php/user/MarkJohnson99"
      })
    },

      updatePreferences : function(sport){
        var username = "MarkJohnson99";
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
        var username = "MarkJohnson99";
        return $http({
           method: 'POST',
           url: 'http://104.236.10.218/public/index.php/addUserToGame',
           data: {gameID:sport.id, username : username}
        
            })
    },

    getGame : function(id){
      console.log(id + "get game");
      return $http({
        method:'GET',
        url: 'http://104.236.10.218/public/index.php/game/'+id
      })
      
    },
    getSuggestedGames : function(sport){
        var username = "TomBanbury0";
        return $http({
           method: 'GET',
           url: 'http://104.236.10.218/public/index.php/gamesByUserPref/'+username
            })
    },

    searchGame : function(sportName){
      console.log(sportName);
      return $http({
        method:'GET',
        url: 'http://104.236.10.218/public/index.php/games/'+sportName
      })
      
    },
     getGamesForUser : function(){
        var username = "MarkJohnson99";
           return $http({
              method:'GET',
              url: 'http://104.236.10.218/public/index.php/gamesForUser/'+username
               })
    }
//*********************************
  }
})

.factory('games', function ($http)
{
  

 var hashtable = {};

  
  return {


      getImage : function(sport){
        //console.log(sport);
      hashtable['basketball'] =  "basketball.png";
      hashtable['soccer'] =  "insoccer.png";
      hashtable['football'] =  "football.png";
      hashtable['tennis'] =  "tennis.png";
      hashtable['indoor soccer'] =  "soccer.png";
      hashtable['sand volleyball'] =  "vb.png";
      hashtable['ultimate frisbee'] =  "frisbee.png";
      hashtable['pool'] =  "pool.png";
      hashtable['ping pong'] =  "pp.png";

    
     image = hashtable[sport];
      //console.log(image);
      return image;
      
    },
    getGame : function(id){
      console.log(id + "get game");
      return $http({
        method:'GET',
        url: 'http://104.236.10.218/public/index.php/game/'+id
      })
      
    },

    // this will be a post method
    addGame : function(chat){
      console.log('addGame');
      return $http({
        method:'GET',
        url: 'http://104.236.10.218/public/index.php/addUserToGame/'+chat.id
      })
      
    },

    getGame : function(id){
      console.log(id + "get game");
      return $http({
        method:'GET',
        url: 'http://104.236.10.218/public/index.php/game/'+id
      })
      
    },

    searchGame : function(sportName){
      //console.log(sportName);
      return $http({
        method:'GET',
        url: 'http://104.236.10.218/public/index.php/games/'+sportName
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
        account factory

    "lj's version of (user) factory"

*/
.factory('account', function($http)
{
  //console.log("in user factory");
  //var users = [];
  return {

    /*
        genpurpose functions...
    */

    //all users information??? when will this be needed???
    getUserData : function(){ 
      return $http({
        method:'GET',
        url: "http://104.236.10.218/public/index.php/users"
      })
    
    },

    /*
        user specific functions
    */

    //delete user
    deleteUser : function(username){

      return $http({
        method: 'DELETE',
        url: 'http://104.236.10.218/public/index.php/deleteUser',
        data: {username: username}
      })

      //data: {usr: usr}
    },
    
    
    //get sports prefrences for a specific user
    getPreferences : function(username){ 
      return $http({
        method:'GET',
        url: "http://104.236.10.218/public/index.php/user/" + username
      })
    },

    //update sports prefrences for a specific user
    updatePreferences : function(username, sport){

      return $http({
           method: 'POST',
           url: 'http://104.236.10.218/public/index.php/addSportForUser',
           data: {sport: sport, username : username}
        
      })
    },

    //redefined not sure which one is correct
    /*
    updatePreferences : function(sport){

        return $http({
           method: 'POST',
           url: 'http://104.236.10.218/public/index.php/addSportForUser',
           data: {gameID:sport.id, username : username}
        })
    },
    */

    //(WORKS)
    //return suggested games for the username
    getSuggestedGames : function(username){

        return $http({
           method: 'GET',
           url: 'http://104.236.33.141/public/index.php/gamesByUserPref/'+ username
        })
    },

    //returns enrolled game for a user
    getGamesForUser : function(username){

        return $http({
            method:'GET',
            url: 'http://104.236.33.141/public/index.php/gamesForUser/'+ username
        })
    },

    /*
        funcitons that should be in a game factory...
    */

    //search by sport name (probably shouldn't be in account)
    searchGame : function(sportName){

      return $http({
        method:'GET',
        url: 'http://104.236.10.218/public/index.php/games/'+ sportName
      })
    },

        //username should be passed, not sure what sport is exactly
    addUserToGame : function(username, id){

      return $http({
         method: 'POST',
         url: 'http://104.236.33.141/public/index.php/addUserToGame',
         data: {gameID:id, username : username}
      })
    },

    //username should be passed, not sure what sport is exactly
    deleteUserFromGame : function(username, id){
      
      return $http({
         method: 'DELETE',
         url: 'http://104.236.33.141/public/index.php/deleteUserFromGame',
         data: {gameID:id, username : username}
      })
    },


    //retrieves info for game based on game_id  (probaly should be in games)
    getGame : function(id){

      return $http({
        method:'GET',
        url: 'http://104.236.33.141/public/index.php/game/'+ id
      })
    }

  }

})
/*
        game factory

    "lj's version of (game((s))) factory"

*/
.factory('game', function ($http)
{
  
  return {

      getImagePath : function(sport){

        var hashtable = {};

        hashtable['basketball'] =  "pictures/basketball.png";
        hashtable['soccer'] =  "pictures/soccer.png";
        hashtable['soccer_large'] =  "pictures/soccer_large.png";
        hashtable['football'] =  "pictures/football.png";
        hashtable['tennis'] =  "pictures/tennis.png";
        hashtable['indoor soccer'] =  "pictures/insoccer.png";
        hashtable['sand volleyball'] =  "pictures/vb.png";
        hashtable['ultimate frisbee'] =  "pictures/frisbee.png";
        hashtable['pool'] =  "pictures/pool.png";
        hashtable['ping pong'] = "pictures/pp.png";

        return hashtable[sport];
      },

      //not sure what this does
      get: function(id) {
        for (var i = 0; i < images.length; i++) {
          if (images[i].id === parseInt(imageId)) {
            return images[i];
          }
        }
      },

      //must get game by id like the function defined in users/account  factory
      getImage : function(id){
        console.log(id + "get game");
        return $http({
          method:'GET',
          url: 'http://104.236.10.218/public/index.php/game/'+id
        }) 
      },
/*
      //seems like this is just a redfeintion of above
      getGame : function(id){
        console.log(id + "get game");
        return $http({
          method:'GET',
          url: 'http://104.236.10.218/public/index.php/game/'+id
        })
        
      },
*/

      //not sure what this does but it looks like it just adds a user to a game so its a redfintion of whats in users/account factory
      // this will be a post method
      addGame : function(chat){
        console.log('addGame');
        return $http({
          method:'GET',
          url: 'http://104.236.10.218/public/index.php/addUserToGame/'+chat.id
        })
        
      },

/*
      //another redefiniton of above
      getGame : function(id){
        console.log(id + "get game");
        return $http({
          method:'GET',
          url: 'http://104.236.10.218/public/index.php/game/'+id
        })
        
      },
*/

      //seems like the search function defined in users/account factory
      searchGame : function(sportName){
        //console.log(sportName);
        return $http({
          method:'GET',
          url: 'http://104.236.10.218/public/index.php/games/'+sportName
        })
        
      },

      //this is create game function very  importaint !!!
        //not working yet
      // this will be a post method once the end point is changed
      createGame: function(time, location,sport, playerCount){

        var hostName = "IanStenbit4"  //should be a param
        console.log("createGame");
        console.log("time: " + time);
        console.log("location: " + location);
        console.log("sport: " + sport);
        console.log("playerCount: " + playerCount);
        console.log("hostName" + hostName);
        
        return $http({
             method: 'POST',
             url: 'http://104.236.10.218/public/index.php/createGame',
             //headers: {'Content-Type': undefined},  //not sure what this is
             data: {time: time, location: location, sport: sport, playerCount: playerCount, hostName: hostName}
          
        })
      }

  }
})


/*
  login_functions factory
*/

.factory('login_functions', function ($state, $http, $q)
{
  return {
    
        ////START login request////
    login_request : function(username, password){

      var usr = username;
      var pwd = password;
      var session_key;

      var deferred = $q.defer();

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

                    deferred.reject();

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
                    window.localStorage.setItem("username", username);  //.getItem('key');

                    //promise
                    deferred.resolve();

                  }

                }
          )

        return deferred.promise
    }

  }//end factory return
}
)

/*
  end login_functions factory
*/

/*
  sign_up_function factory
*/
.factory('sign_up_functions', function ($state, $http, $q)
{
  return {

    sign_up : function(username, password, email){
      var usr = username;
      var pwd = password;
      var eml = email;
      var deferred = $q.defer();

      $http(
        {
             method: 'GET',
             url: 'http://104.236.33.141/public/index.php/newUser/' + usr + '/' + pwd + '/' + eml

        }
      ).then(
                //$response->setStatus(400);  //routes newUsr

                function(session_key_repsonse)
                {

                  if(session_key_repsonse.status ==  200)
                  {

                    console.log(session_key_repsonse);

                    //retrive session key from response data
                    session_key = session_key_repsonse.data;

                    //save session key to local stoarage
                    window.localStorage.setItem("session_key", session_key);

                    //promise
                    deferred.resolve();

                  }

                  //should check for correct session key format
                  //256 character hexidecimal
                  else
                  {
                        deferred.reject();

                  }

                }
      )

       return deferred.promise
    }//end newUser

  }//end factory return
}
)

/*
  end sign_up_function factory
*/

/*
  chat_function factory
*/
.factory('chat_functions', function ($state, $http, $q)
{
  return {

    get_chat : function(gameID){
      var gID = gameID;
      var deferred = $q.defer();

      $http(
        {
             method: 'GET',
             url: 'http://104.236.33.141/public/index.php/chatData/' + gID

        }
      ).then(
                //$response->setStatus(400);  //routes chatData

                function(response)
                {

                  if(response.status ==  200)
                  {
                    //promise
                    deferred.resolve(response.data);

                  }

                  else
                  {
                        deferred.reject();
                  }

                }
      )

       return deferred.promise
    },//end get_chat

     send_message : function(username, gameID, message){
      var gID = gameID;
      var usr = username;
      var msg = message;
      var deferred = $q.defer();

      $http(
        {
             method: 'POST',
             url: 'http://104.236.33.141/public/index.php/chatMessage',
             data: {username: usr, game_id: gID, message: msg}
        }
      ).then(
                //$response->setStatus(400);  //routes chatMessage

                function(response)
                {

                  if(response.status ==  200)
                  {
                    deferred.resolve(response.data);

                  }

                  else
                  {
                        deferred.reject();
                  }

                }
      )

       return deferred.promise
    }//end send_message

  }//end factory return

}
);

/*
  end chat_functions factory
*/
