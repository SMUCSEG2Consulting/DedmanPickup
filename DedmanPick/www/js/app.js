// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();gf
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.headers.common = {Accept: 'text/plain'};
  //console.log($httpProvider.defaults.headers.common);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  //login  
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  //sign up
  .state('sign_up', {
      url: '/sign_up',
      templateUrl: 'templates/sign_up.html',
      controller: 'sign_up_Ctrl'
  })

  //home
  .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
  })

  //createGame
  .state('createGame', {
      url: '/createGame',
      templateUrl: 'templates/createGame.html'
  })

  //game_lobby
  .state('game_lobby', {
      url: '/game_lobby/:gameID',
      templateUrl: 'templates/game_lobby.html',
      controller: 'GameLobbyCtrl'
  })
   
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/chats/dash',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.chat-detail-1', {
      url: '/account/:chatId',
      views: {
        'tab-account': {
          templateUrl: 'templates/chat-detail2.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.chat-detail-3', {
      url: '/accounts/:chatId',
      views: {
        'tab-account': {
          templateUrl: 'templates/chat-detail3.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }

  });

  // defualt page
  $urlRouterProvider.otherwise('/login');

});
