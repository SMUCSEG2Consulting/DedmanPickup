var app = angular.module('starter.controllers', []);
app.factory('addGameFactory', function ()
{
  return {
    addGame: function(chat){
      console.log('in factory');}
    }
});
