angular.module('starter.factories', [])

.factory('games', function ($http)
{
  return {
    addGame : function(chat){
      console.log('addGame');
      
    },

    getGames: function(){
    	console.log("getGames");
    	return $http({
    		method:'GET',
    		url: "http://dev.ianjjohnson.com/public/index.php/games"
    	});
		
    }
}
});




