angular.module('starter.factories', [])

.factory('games', function ($http)
{
  return {
    addGame : function(chat){
      console.log('in factory');
    },
    getGames: function(){
    	return $http({
    		method:'GET',
    		url: "http://dev.ianjjohnson.com/public/index.php/games"
    	});
    }
}
});
