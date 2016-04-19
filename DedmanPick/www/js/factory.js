angular.module('starter.factories', [])

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

    getGames: function(){
        console.log("getGames");

        return $http({
        method:'GET',
        url: "http://dev.ianjjohnson.com/public/index.php/games"
     })
    },

    // this will be a post method once the end point is changed
    createGame: function(time, location, sport){

      var playerCount = 0; 
      var hostName = "IanStenbit4"

      console.log("createGame");
      console.log("time: " + time);
      console.log("location: " + location);
      console.log("sport: " + sport);
      console.log("playerCount" + playerCount);
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

    newUser : function(username, password, email){
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
.factory('sign_up_functions', function ($state, $http, $q)
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

                    console.log(response);

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