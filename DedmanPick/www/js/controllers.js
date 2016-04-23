angular.module('starter.controllers', ['starter.factories'])

/*
  some controller
*/
.controller('DashCtrl', function($scope) {
  //***does nothing***
})

/*
  Chats controller
*/
.controller('ChatsCtrl', function($scope, $http, Chats, user,games) {
    console.log('in send game data');
    $scope.form = {};
      $scope.search = function()
      {
        $scope.searchParam = $scope.form.name;
        var searchResults =  user.searchGame($scope.searchParam).then(function(response){
          $scope.searchResults = response.data;
          console.log($scope.searchResults[0]);
          //console.log($scope.users);
        })
        
      };

      $scope.createNewGame = function (){
        //***does nothing***
        console.log("create new game")
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
      }//;
})


/*
  Create Game controllers(don't think we need this "game factory")
*/
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

/*
  Delete User controllers(don't think we need this "account factory")
*/
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

/*
  Join Game controllers (don't think we need this "game factory")
*/
.controller('JoinGameCtrl', function($scope, $state, $http, user) {  
  $scope.joinGame = function joinGame(chat){
    console.log(chat);
  $scope.addToGame = user.addUserToGame(chat);
  //$scope.fromFactory = addGameFactory.addGame(chat);
  $state.go('tab.account', chat);};
})


/*
  Game Lobby controller
*/
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

/*
  Search controller
*/
.controller('SearchCtrl', function($scope, $state) {
    //***does nothing***
})

/*
  Chat Deatail controller
*/
.controller('ChatDetailCtrl', function($scope, $stateParams, games) {
  
        //console.log($stateParams.chatId);

    $scope.chat = games.getGame($stateParams.chatId).then(function(response){
        $scope.chat = response.data;
        //console.log($scope.chat[0].image);
        //console.log(Chats[$stateParams.chatId]);
        //console.log(Chats.get($stateParams.chatId));
    })
})

/*
  Account controller
*/
.controller('AccountCtrl', function($scope, $state, user, games) {
    
    //Pull name from database
    $scope.userName = "Katy";

    var gamesJoined = user.getGamesForUser().then(function(response){
        $scope.gamesJoined = response.data;
        //$scope.$apply();
    })

    var suggestedGames =  user.getSuggestedGames().then(function(response){
        $scope.suggestedGames = response.data;
        //$scope.apply();
        console.log($scope.suggestedGames[0].sport);
        //console.log($scope.users);
    })

    $scope.getGameData = function(id){
      console.log('in get game');

      $scope.game = user.getGame(id).then(function(response){
        $scope.game = response.data;
        console.log(response);
        console.log($scope.game)
        ;
      })
    }

    $scope.getUserData = function(){
      $scope.users = user.getUserData().then(function(response){
        console.log(response);
        console.log(getUserData);
      })
    };

    $scope.getPreferences = function(){
      $scope.users = user.getPreferences().then(function(response){
        $scope.preferences = response.data;
        console.log($scope.preferences[0].sport);
      })
    };

    $scope.getSuggestedGames = function(){
      $scope.suggestedGames = user.getSuggestedGames()
          .then(
            function(response){
              $scope.suggestedGames = response.data;
              console.log($scope.suggestedGames[0].sport);
            }
          )
    };

    $scope.getUserPreferenceProfile = function(){
      $scope.users = user.getOneUser()
        .then(
          function(response){
            users = response.data;
            console.log(users[0]);
          }
        )
    };
})

/*
  Home controller ("Account")
*/
                                                    //need own factories as well
.controller('HomeCtrl', function($scope, $state, account, game) {
    
    //Pull name from database
    $scope.username = "TomBanbury0";

    //this will see when your next game is...
    account.getGamesForUser($scope.username)
      .then(
          function(response){

                      //format the code so you don't return everything
                      //just next game
                      //$scope.gamesJoined = response.data;

            //all upcomming games for a user
            $scope.all_upcomming_games = response.data;

            /*
              format next_game
            */

            $scope.next_game = response.data[0];

            /*
                note:
                  should be a function that takes time as event time as param...
            */

            //extract hour minute second from next game time to compare to current time
            var start_time = $scope.next_game.time;
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
              var minute_diff = parseInt(game_minute) - parseInt(cur_minute);
              var second_diff = parseInt(game_second) - parseInt(cur_second);

              //time until game format
              var time_until_game = hour_diff.toString() + " hours and " + minute_diff.toString() + " minutes";

              //change global var time
              $scope.next_game.time = time_until_game;
            }

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
    account.getSuggestedGames($scope.username).then(function(response){$scope.suggestedGames = response.data;})

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




