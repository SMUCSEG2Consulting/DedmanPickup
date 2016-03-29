angular.module('starter.factories', [])

.factory('addGameFactory', function ()
{
  return {
    addGame : function(chat){
      console.log('in factory');}
    }
});
