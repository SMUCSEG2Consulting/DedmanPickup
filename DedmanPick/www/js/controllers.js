angular.module('starter.controllers', ['starter.factories'])


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $http, Chats, user,games) {
console.log('in send game data');
$scope.form = {};
$scope.getChatImage = function (sport)
  {
    //console.log("here");
    return $scope.suggestedImage = games.getImage(sport);
  }
  $scope.search = function()
  {
    $scope.searchParam = $scope.form.name;
    var searchResults =  user.searchGame($scope.searchParam).then(function(response){
      $scope.searchResults = response.data;
      console.log($scope.searchResults[0]);
      //console.log($scope.users);
    })
    
  };

  //$scope.getImage = function(sport)
  //{
   //   $scope.image = 
      //console.log($scope.users);
   // })
    
  //}//;
  //console.log(Chats.get($stateParams.chatId));
  //$scope.gameData = function sendGameData(sport, id, location, time){
    //console.log('in send game data');
      //}
  $scope.createNewGame = function (){
    //console.log("in get game");
    console.log("create new game")
      //console.log($scope.gamesJoined);
  };
console.log('in chats');
 
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


  //console.log(Chats.get($stateParams.chatId));
  $scope.gameData = function sendGameData(sport, id, location, time){
    console.log('in send game data');
      }
})

.controller('CreateGameCtrl', function($scope, $state, games) {
  $scope.createGame = function createGame(time, location, sport, playerCount){
    games.createGame($scope.time, $scope.location, $scope.sport, $scope.playerCount).then(function(response){
      console.log(response);
      //$state.go('tab.chats');
    })};

$scope.newGame = function newGame(){
  
      $state.go('tab.dash');
    };

  $scope.search = function(){
      var name = $scope.form.name;
      //$state.go('tab.dash');
    };
})

//Iqbal played with this:****************
.controller('DeleteUserCtrl', function($scope, $state, user) {
  $scope.deleteUser = function deleteUser(usr){
    user.deleteUser($scope.usr).then(function(response){
      console.log(response);
    })
    console.log('deleted user');
    console.log()
    //$state.go('tab.chats');
  };
  })
//***************************************
.controller('JoinGameCtrl', function($scope, $state, $http, user) {  
  $scope.joinGame = function joinGame(chat){
    console.log(chat);
  $scope.addToGame = user.addUserToGame(chat);
  //$scope.fromFactory = addGameFactory.addGame(chat);
  $state.go('tab.account', chat);};
})

.controller('GameLobbyCtrl', function($scope, $stateParams, GameData, games) {
  //$scope.chat = Chats.get($stateParams.chatId);
  //console.log('in send game data');
  $scope.search = function()
  {
    console.log("in search");
    //$scope.searchParam = $scope.form.name;
  }
  //console.log(Chats.get($stateParams.chatId));
  $scope.gameData = function sendGameData(sport, id, location, time){
    //console.log('in send game data');
      }
 
  $scope.createNewGame = function (){
    //console.log("in get game");
    console.log("create new game")
      //console.log($scope.gamesJoined);
  };

  $scope.search = function()
  {
    console.log("in search");
    //$scope.searchParam = $scope.form.name;
  }
})

.controller('SearchCtrl', function($scope, $state) {
    //console.log('(search controller)');
})

.controller('ChatDetailCtrl', function($scope, $stateParams, games) {
  
  //console.log($stateParams.chatId);
$scope.getChatImage = function (sport)
  {
    //console.log("here");
    return $scope.suggestedImage = games.getImage(sport);
  }

  $scope.chat = games.getGame($stateParams.chatId).then(function(response){
      $scope.chat = response.data;


      //console.log($scope.chat[0].image);
  //console.log(Chats[$stateParams.chatId]);
  //console.log(Chats.get($stateParams.chatId));
})
 
})


.controller('AccountCtrl', function($scope, $state, user, games) {
  $scope.userName = "Katy";
  //console.log('acct ctrl');
  //console.log(games.images);
  var gamesJoined = user.getGamesForUser().then(function(response){
      $scope.gamesJoined = response.data
      console.log(response.data[0]);
      //$scope.$apply();
    })

  
  


  var suggestedGames =  user.getSuggestedGames().then(function(response){
      $scope.suggestedGames = response.data;
      //$scope.apply();
      //for (i = 0; i < suggestedGames.length; i++) { 
      $scope.suggestedImage = games.getImage($scope.suggestedGames[0].sport)//.then(function(response){
      //$scope.suggestedImage = response.data;
          //console.log($scope.suggestedImage);
        //})
      //console.log($scope.suggestedGames[0].sport);
      //console.log($scope.users);
    })
  $scope.getImage = function (sport)
  {
    //console.log("here");
    return $scope.suggestedImage = games.getImage(sport);
  }
 $scope.getGameData = function(id){
    //console.log('in get game');
      $scope.game = user.getGame(id).then(function(response){
      $scope.game = response.data;
      console.log(response);
      console.log($scope.game)
      ;
    })
      }
   $scope.getUserData = function(){
    //console.log("user data");
    $scope.users = user.getUserData().then(function(response){
      console.log(response);
      console.log(getUserData);
    })
  };
  $scope.getPreferences = function(){
    //console.log("user data");
    $scope.users = user.getPreferences().then(function(response){
      $scope.preferences = response.data;
      console.log($scope.preferences[0].sport);
      //console.log($scope.users);
    })
  };
  $scope.getSuggestedGames = function(){
    //console.log("user data");
    $scope.suggestedGames = user.getSuggestedGames().then(function(response){
      $scope.suggestedGames = response.data;
      console.log(suggestedGames.sport);
            $scope.getImages(suggestedGames.sport);
})
      
  };

  $scope.getImages = function getImages(sport)
  {
    $scope.suggestedImage = games.getImage('basketball').then(function(response){
      $scope.suggestedImage = response.data;
          console.log($scope.suggestedImage);
        })

  };

  $scope.getUserPreferenceProfile = function(){
    //console.log("user data");
    $scope.users = user.getOneUser().then(function(response){
      users = response.data;
      console.log(users[0]);
      //console.log($scope.users);
    })
  };
  
})

/*
  Start A Game Controller
  "lj's version create game ctrl"
*/
.controller('StartAGameCtrl', function($scope, $state, games) {

    $scope.newGame = function newGame(){
      //change state to create a game page
      //$state.go('new_game');
    };
/*
  $scope.createGame = function createGame(time, location, sport, playerCount){
    games.createGame($scope.time, $scope.location, $scope.sport, $scope.playerCount).then(function(response){
      console.log(response);
      //$state.go('tab.chats');
    }
  )};*/
/*
  $scope.search = function(){
        var name = $scope.form.name;
        //$state.go('tab.dash');
      };
*/
})

/*
  Home controller ("Account")
*/
                                                    //need own factories as well
.controller('HomeCtrl', function($scope, $state, account, game) {

    //Pull name from database
    $scope.username = window.localStorage.getItem('username');

    //Start A Game
    $scope.startGame = function(){
      console.log("startGame()");
      $state.go("createGame");
    }

    //Search By sport
    $scope.searchBySport = function(){
      account.searchGame($scope.search_ui).then(function(response){
        $scope.searchResults = response.data;

        //set icons
        for(var i=0; i<$scope.searchResults.length; i++){
            var image_path = game.getImagePath($scope.searchResults[i].sport);
            $scope.searchResults[i].img_path = image_path;
        }

      })
    }

    //this will see when your next game is...
    account.getGamesForUser($scope.username)
      .then(
          function(response){

            //var closed_game_index = 0;

                      //format the code so you don't return everything
                      //just next game
                      //$scope.gamesJoined = response.data;

            //all upcomming games for a user
            $scope.all_upcomming_games = response.data;

            /*
              format next_game
            */

            //$scope.next_game = response.data[0];

            for (var i=0; i< $scope.all_upcomming_games.length; i++){
              /*
                  note:
                    should be a function that takes time as event time as param...
              */

              //extract hour minute second from next game time to compare to current time
              //var start_time = $scope.next_game.time;
              var start_time =$scope.all_upcomming_games[i].time
              var regex = /(\d\d):(\d\d):(\d\d)/g;
              var match = regex.exec(start_time);


              if(match != null){
                var game_hour = match[1];
                var game_minute = match[2];
                var game_second = match[3];

                //current time
                var d = new Date();
                var cur_hour = d.getHours();
                var cur_minute = d.getMinutes();
                var cur_second = d.getSeconds();

                //diffrence (should be no negitive values!!!)
                var hour_diff = parseInt(game_hour) - parseInt(cur_hour);
                if(hour_diff < 0){
                  hour_diff = hour_diff - 1;  //maybe
                }

                var minute_diff = parseInt(game_minute) - parseInt(cur_minute);
                if(minute_diff < 0){
                  //minute_diff should be one less
                  hour_diff = hour_diff -1;
                  //second_diff should be 60 + second_diff
                  minute_diff = 60 + minute_diff;
                }
                var second_diff = parseInt(game_second) - parseInt(cur_second);
                //if negitive
                if(second_diff < 0){
                  //minute_diff should be one less
                  minute_diff = minute_diff -1;
                  //second_diff should be 60 + second_diff
                  second_diff = 60 + second_diff;
                }


                //time until game format
                var time_until_game = hour_diff.toString() + " hours and " + minute_diff.toString() + " minutes";

                //change global var time
                //$scope.next_game.time = time_until_game;
                $scope.all_upcomming_games[i].time = time_until_game;

                //set correct image
                //var image_path = game.getImagePath($scope.next_game.sport);
                //$scope.next_game.img_path = image_path;
                var image_path = game.getImagePath($scope.all_upcomming_games[i].sport);
                $scope.all_upcomming_games[i].img_path = image_path;

                //if game is past remove from list and save location for next neasest game
                  //check date and time 
                if( hour_diff < 0){
                  //closed_game_index = i;
                  //console.log(closed_game_index);
                  $scope.all_upcomming_games.splice(i,1);
                  i = i-1;
                }

                //move closet game to the top
                //if($scope.all_upcomming_games[i].next_game_index = i;
              }

              //$scope.next_game = $scope.all_upcomming_games[closed_game_index+1];
              $scope.next_game = $scope.all_upcomming_games[0];

            }

            //no upcomming games
            //if($scope.all_upcomming_games.length == 0)

          }
      )

    /*
    //for whole list of games a user is enrolled in
    var gamesJoined = user.getGamesForUser()
      .then(
          function(response){
            $scope.gamesJoined = response.data;
            //$scope.$apply();
          }
      )
    */

    //suggested games for your
      //time formatted incorrectly
    account.getSuggestedGames($scope.username)
      .then(
        function(response){
          $scope.suggestedGames = response.data;

          //set icons
          for(var i=0; i<$scope.suggestedGames.length; i++){
            var image_path = game.getImagePath($scope.suggestedGames[i].sport);
            $scope.suggestedGames[i].img_path = image_path;
          }
        }
      )

    /*
    //not quite sure what this does
    $scope.getGameData = function(id){
      console.log('in get game');

      $scope.game = user.getGame(id).then(function(response){
        $scope.game = response.data;
        console.log(response);
        console.log($scope.game)
        ;
      })
    }
    */

    /*
    //not quite sure what this does
    $scope.getUserData = function(){

      //doesn't look we need a then
      //sets a global variable users as all the user information returned by /users endpoint
      //not sure  why this is importaint to do
      $scope.users = user.getUserData().then(function(response){
        console.log(response);
        console.log(getUserData);
      })
    };
    */

    /*
    //this seems strange overwriting the global users with sports prefs from a specific user
    $scope.getPreferences = function(){
      $scope.users = user.getPreferences().then(function(response){
        $scope.preferences = response.data;
        console.log($scope.preferences[0].sport);
      })
    };
    */

  /*
    $scope.getUserPreferenceProfile = function(){
      $scope.users = user.getOneUser()
        .then(
          function(response){
            users = response.data;
            console.log(users[0]);
          }
        )
    };
    */
})

/*
  Game Lobby Controller ("Chats")
*/
                                                    //need own factories as well
.controller('GameLobbyCtrl', function($scope, $stateParams, $state, account, game, chat_functions, $window) {

    //Pull name from local storage
    $scope.username = window.localStorage.getItem('username');

    //pull game information from database
        //retrieve gameID form url/$stateParams (defined in apps.js)

    $scope.getGameInfo = function(){
      account.getGame($stateParams.gameID).then(
        function(response){
          $scope.pickup_game = response.data;

          var image_path = game.getImagePath($scope.pickup_game.sport);
          $scope.pickup_game.img_path = image_path;

          $scope.players = $scope.pickup_game.playerNames;
        }
      )
    }

    //***set game info***
    $scope.getGameInfo();


    //Message board
      //returns format : {"username":"PaigeFontenot24","message":"See you all in 10.0"}
     $scope.getMesseges = function(){
        chat_functions.get_chat($stateParams.gameID).then(
           function(response){
            $scope.chat_data = response;
          }
        )
      }

    //*** fill messages ***
    $scope.getMesseges();

    //Send Message
    $scope.sendMessage = function(){
      console.log("sendMessage()");
      console.log($scope.message_ui);

      //uses chat_functions to send your message
      chat_functions.send_message($scope.username, $stateParams.gameID, $scope.message_ui);

      //update
      $scope.getMesseges();
    }

    //Leave Game
    $scope.leaveGame = function(){
      console.log("leaveGame()");

      //remove username from gameID
      account.deleteUserFromGame($scope.username, $stateParams.gameID).then(
          function(response){
            console.log(response);

            $state.go("home");
          }
      )
    }
    
    //join Game
    $scope.joinGame = function(){
      console.log("joinGame()");

      //add username to gameID
      account.addUserToGame($scope.username, $stateParams.gameID).then(
          function(response){
            console.log(response);
          }
      )
    }

    /*** join game on entry ***/
    $scope.joinGame();
    
    //hiding and showing players in lobby
    $scope.showPlayersInLobby = true;

    $scope.showPlayers = function(){
      //$scope.showPlayersInLobby = $scope.showPlayersInLobby === false ? true: false;
      /*
      if($scope.showPlayersInLobby == false)
      {
       $scope.showPlayersInLobby = true;
       console.log($scope.showPlayersInLobby);
      }
      else
      {
        $scope.showPlayersInLobby = false;
        console.log($scope.showPlayersInLobby);
      }*/
    }

    //join/leave button

    account.getGame($stateParams.gameID).then(
      function(response){

        var in_lobby = false;

        for(var i=0; i < response.data.playerNames.length; i++){
            if (response.data.playerNames[i] == $scope.username){
              in_lobby = true;
            }
        }

        if (!in_lobby)
        {
          $scope.join_leave_button = "Join Game";
          $scope.join_leave_function =  "joinGame()";
        } 
        else 
        {
          $scope.join_leave_button = "Leave Game";
          $scope.join_leave_function =  "leaveGame()";
        }

      }
    )

})

/*
      Login Controller
*/
.controller('LoginCtrl', function($scope, $state, $http, login_functions) {
    console.log('(login controller)');
    
    //on click
    $scope.login = function() {

      //if( !($scope.data.username == undefined || $scope.data.password == undefined) ){

        //tmp display username and password enterd
        console.log("User: " + $scope.data.username + ", Password: " + $scope.data.password);

        //call login function to make request
        login_functions.login_request(  $scope.data.username, $scope.data.password  )

        .then(
                //incorrect password
                function() 
                {
                    //$state.go('tab.account');
                    console.log("success");

                    //change state
                    $state.go('tab.account');
                }, 

                //correct pasword
                function() 
                {
                     //$scope.failed_login_attempt_message = '<font size="3" color="red">Incorrect Username or Password</font><br><a href="#" ng-click = "email_new_password()">forgot password?</a>';
                     $scope.failed_login_attempt_message = '<font size="3" color="red">Incorrect Username or Password</font>';
                }
              );
      //}
    }

    //on click
    $scope.sign_up_state = function() {
        console.log("change to sign up");

        $state.go('sign_up');
        
    }

        //on click
    $scope.email_new_password = function() {
        console.log("no email provided");
        
    }
})


/*
      Sign up Controller
*/
.controller('sign_up_Ctrl', function($scope, $state, $http, sign_up_functions) {
    console.log('(sign_up_Ctrl controller)');
    console.log(sign_up_functions)
    
    //on click
    $scope.sign_up = function() {

      //if( $scope.data.username != undefined && $scope.data.password != undefined && $scope.data.email != undefined)

        //tmp display username and password enterd
        console.log("User: " + $scope.data.username + ", Password: " + $scope.data.password + ", Email: " + $scope.data.email);

        console.log(sign_up_functions);

        //call login function to make request
        sign_up_functions.sign_up(  $scope.data.username, $scope.data.password, $scope.data.email  )

        .then(
                //incorrect password
                function() 
                {
                    console.log("success");

                    //change state
                    $state.go('tab.account');
                }, 

                //correct pasword
                function() 
                {
                      console.log("error");

                     $scope.failed_login_attempt_message = '<font size="3" color="red">Please fill out the feilds correctly</font>';
                }
              );
    }

    //on click
    $scope.login_state = function() {
        console.log("change to login");

        $state.go('login');
        
    }
})




