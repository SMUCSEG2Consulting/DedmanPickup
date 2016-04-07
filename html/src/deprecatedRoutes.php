<?php

/*delete user from game*/
/*$app->get('/deleteUserFromGame/{gameID}/{username}',
	function($request, $response, $args){
		$db = $this->dbConn;
		$statement = $db->prepare('DELETE FROM game WHERE gameID=:gid AND username=:usr');
		$statement->execute(array('usr' => $request->getParam('username'), 'gid' => $request->getParam('gameID')));
		return $response->write('Deleted.'); 
	}
);*/

/*$app->get('/addUserToGame/{gameID}/{username}',
	function($request, $response, $args){
		$db = $this->dbConn;
		$statement = $db->prepare('INSERT into enlist(playerName, gameID) values(:username, :gameID)');
		$statement->execute(array(
				'username' => $args['username'],
				'gameID' => $args['gameID']
		));

		$statement = $db->prepare('SELECT count(playerName) FROM enlist WHERE gameID = :gameID');
		$statement->execute(array(
				'gameID' => $args['gameID']
		));
		$count = $statement->fetch(PDO::FETCH_ASSOC);

		$statement = $db->prepare('UPDATE game SET full = TRUE WHERE id = :gameID AND playerCount <= :count');
		$statement->execute(array(
				'count' => $count,
				'gameID' => $args['gameID']
		));

		return $response->write(json_encode($args));
	}
);*/

/*$app->get('/updateUser/{usr}/{s1}/{s2}/{s3}',
	function($request, $response, $args){
		$db = $this->dbConn;
		$statement = $db->prepare('UPDATE user SET sport1= :one, sport2 = :two, sport3 = :three WHERE name = :username');
		$statement->execute(array(
				'one' => $args['s1'],
				'two' => $args['s2'],
				'three' => $args['s3'],
				'username' => $args['usr']
		));
		return $response->write(json_encode($args));
	}
);*/

/*$app->get('/createGame/{hostName}/{time}/{sport}/{location}/{playerCount}',
	function($request, $response, $args){
		$db = $this->dbConn;
		$statement = $db->prepare('INSERT INTO game(sport, time, playerCount, location, date) values (:sport, :time, :count, :loc, CURDATE())');
		$statement->execute(array(
				'sport' => $args['sport'],
				'time' => $args['time'],
				'loc' => $args['location'],
				'count' => $args['playerCount']
		));

		$select = $db->prepare('SELECT max(id) from game');
		$select->execute();
		$id = $select->fetch(PDO::FETCH_ASSOC)['max(id)'];

		$statement = $db->prepare('INSERT INTO enlist(playerName, gameID) values(:name, :id)');
		$statement->execute(array(
				'name' => $args['hostName'],
				'id' => $id
		));

		return $response->write("Success!");
	}
);*/

/*$app->get('/deleteGame/{id}',
	function($request, $response, $args){
		
		$db = $this->dbConn;
		$statement = $db->prepare('DELETE FROM game WHERE id=:id');
		$statement->execute(array('id' => $args['id']));

		$statement = $db->prepare('DELETE FROM enlist WHERE gameID=:id');
		$statement->execute(array('id' => $args['id']));

		return $response->write('Deleted.'); 

	}

);*/

/*$app->get('/deleteUser/{username}/{password}', 
	function($request, $response, $args){
		
		$db = $this->dbConn;

		$statement = $db->prepare('SELECT * FROM user WHERE name=:usr');
		$statement->execute(array('usr'=>$args['username']));
		
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(empty($result)){
			return $response->write('No such user');
		}

		$statement = $db->prepare('SELECT salt, hash FROM user WHERE name = :nm');
		$statement->execute(array(
			'nm' => $args['username'],
		));

		$item = $statement->fetch(PDO::FETCH_ASSOC);
		$salt = $item['salt'];

		$hash = hash('sha256', $args['password'] . $salt);

		if($hash == $item['hash']){
			$statement = $db->prepare('DELETE FROM user WHERE name=:name');
			$statement->execute(array('name' => $args['username']));
			return $response->write('Deleted!');
		} else {
			return $response->write('wrong pass');
		}


			
	}
);*/

/*$app->get('/removeSportForUser/{username}/{sport}',
	function($request, $response, $args){
		$db = $this->dbConn;
		
		$statement = $db->prepare('DELETE FROM sportPreference WHERE username=:usr AND sport =:spr');
		$statement->execute(array(
			'usr' => $args['username'],
			'spr' => $args['sport']
		));

		return $response->write('success');
	}
);*/

/*$app->get('/addSportForUser/{username}/{sport}',
	function($request, $response, $args){
		$db = $this->dbConn;
		
		$statement = $db->prepare('INSERT INTO sportPreference(username, sport) values(:usr, :spr)');
		$statement->execute(array(
			'usr' => $args['username'],
			'spr' => $args['sport']
		));

		return $response->write('success');
	}
);*/