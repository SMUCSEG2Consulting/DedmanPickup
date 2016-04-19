<?php

/*
Random bitstring generation for hash salting
*/
function randomBitString($length = 256) {
    $chars = '0123456789abcdef';
    $len = strlen($chars);
    $str = '';

    for ($i = 0; $i < $len; $i++) {
        $str .= $chars[rand(0, $len - 1)];
    }
    return $str;
}

function authenticateSession($db, $user, $sessionKey){
	$statement = $db->prepare('SELECT * FROM session WHERE sessionKey=:sk AND username = :usr');
	$statement->execute(array('usr' => $user, 'sk' => $sessionKey));
	$temp = array_values($statement->fetchAll(PDO::FETCH_ASSOC));
		
	foreach($temp as $blah){
		return TRUE;
	}

	return FALSE;
}

$app->get('/json',
	function ($request, $response, $args) {
		return $response->write(json_encode(array('field' => 'value')));
	}
);

$app->get('/json/{id}',
	function ($request, $response, $args){
		return $response->write(json_encode(array('id' => $args['id'])));
	}
);

$app->get('/games/{sport}',
	function($request, $response, $args) {
		$db = $this->dbConn;
		$statement = $db->prepare('SELECT * FROM game WHERE date >= CURDATE() AND full = FALSE AND sport = :sp');
		$statement->execute(array('sp' => $args['sport']));
		$arr = $statement->fetchAll(PDO::FETCH_ASSOC);
		return $response->write(json_encode($arr));
	}
);


$app->get('/games',
	function($request, $response, $args) {
		$db = $this->dbConn;
		$statement = $db->prepare('SELECT * FROM game WHERE date >= CURDATE() AND full = FALSE');
		$statement->execute();
		$arr = $statement->fetchAll(PDO::FETCH_ASSOC);
		return $response->write(json_encode($arr));
	}
);

$app->get('/gamesByUserPref/{username}',
	function($request, $response, $args) {
		$db = $this->dbConn;
		$statement = $db->prepare('SELECT * FROM game WHERE date >= CURDATE() AND sport IN (SELECT sport FROM sportPreference WHERE username = :usr AND full = FALSE)');
		$statement->execute(array('usr'=>$args['username']));
		$arr = $statement->fetchAll(PDO::FETCH_ASSOC);
		return $response->write(json_encode($arr));
	}
);

$app->get('/game/{id}',
	function ($request, $response, $args){
		$db = $this->dbConn;

		$statement = $db->prepare('SELECT * FROM game WHERE id=:id');
		$statement->execute(array('id' => $args['id']));
		$arr = $statement->fetch(PDO::FETCH_ASSOC);

		$statement = $db->prepare('SELECT playerName FROM enlist WHERE gameID=:id');
		$statement->execute(array('id' => $args['id']));
		$temp = array_values($statement->fetchAll(PDO::FETCH_ASSOC));
		
		$ids = array();
		foreach($temp as $player){
			$ids[] = $player['playerName'];
		}

		$arr['playerNames'] = $ids;
		
		return $response->write(json_encode($arr));
	}
);

$app->get('/newUser/{name}/{pwd}/{email}',
	function($request, $response, $args){
		$db = $this->dbConn;

		$statement = $db->prepare('SELECT * FROM user WHERE name=:usr');
		$statement->execute(array('usr'=>$args['name']));
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(!empty($result)){
		  //$response->setStatus(400);
			return $response->write('Error - name already taken');
		}

		$salt = randomBitString();
		$hash = hash('sha256', $args['pwd'] . $salt);

		$statement = $db->prepare('INSERT INTO user(name, salt, hash, email) values(:usr, :sl, :hs, :em)');
		$statement->execute(array(
			'usr' => $args['name'],
			'sl' => $salt,
			'hs' => $hash,
			'em' => $args['email']
		));

		return $response->write($args['name']);
	}
);

$app->post('/newUser',
	function($request, $response, $args){
		$db = $this->dbConn;

		$statement = $db->prepare('SELECT * FROM user WHERE name=:usr');
		$statement->execute(array('usr'=>$request->getParam('name')));
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(!empty($result)){
			return $response->write('Error - name already taken');
		}

		$salt = randomBitString();
		$hash = hash('sha256', $request->getParam('pwd') . $salt);

		$statement = $db->prepare('INSERT INTO user(name, salt, hash, email) values(:usr, :sl, :hs, :em)');
		$statement->execute(array(
			'usr' => $request->getParam('name'),
			'sl' => $salt,
			'hs' => $hash,
			'em' => $request->getParam('email')
		));

		return $response->write($args['name']);
	}
);

$app->get('/users',
	function($request, $response, $args){
		$db = $this->dbConn;
		$statement = $db->prepare('SELECT name, id, email FROM user');
		$statement->execute();
		$arr = $statement->fetchAll(PDO::FETCH_ASSOC);
		return $response->write(json_encode($arr));
	}
);

$app->get('/chatData/{gameID}',
	function($request, $response, $args){
		$db = $this->dbConn;
		$statement = $db->prepare('SELECT username, message FROM chat WHERE gameID = :gid ORDER BY time');
		$statement->execute(array(
			'gid' => $args['gameID']
			));
		$arr = $statement->fetchAll(PDO::FETCH_ASSOC);
		return $response->write(json_encode($arr));
	}
);

$app->post('/addSportForUser',
	function($request, $response, $args){
		$db = $this->dbConn;
		
		$statement = $db->prepare('INSERT INTO sportPreference(username, sport) values(:usr, :spr)');
		$statement->execute(array(
			'usr' => $request->getParam('username'),
			'spr' => $request->getParam('sport')
		));

		return $response->write('Success!');
	}
);

$app->post('/chatMessage',
	function($request, $response, $args){
		$db = $this->dbConn;
		
		$statement = $db->prepare('INSERT INTO chat(username, gameID, message, time) values(:usr, :gid, :msg, NOW())');
		$statement->execute(array(
			'usr' => $request->getParam('username'),
			'gid' => $request->getParam('game_id'),
			'msg' => $request->getParam('message')
		));

		return $response->write('Success!');
	}
);

$app->delete('/removeSportForUser',
	function($request, $response, $args){
		$db = $this->dbConn;
		
		$statement = $db->prepare('DELETE FROM sportPreference WHERE username=:usr AND sport =:spr');
		$statement->execute(array(
			'usr' => $request->getParam('username'),
			'spr' => $request->getParam('sport')
		));

		return $response->write('success');
	}
);

$app->get('/user/{username}',
	function($request, $response, $args){
		$db = $this->dbConn;
		$statement = $db->prepare('SELECT sport FROM sportPreference WHERE username = :usr');
		$statement->execute(array(
				'usr' => $args['username']
			));
		$arr = $statement->fetchAll(PDO::FETCH_ASSOC);
		return $response->write(json_encode($arr));
	}
);

$app->get('/gamesForUser/{username}',
	function($request, $response, $args){
		$db = $this->dbConn;

		$statement = $db->prepare('SELECT g.sport, time, playerCount, location FROM enlist e, game g WHERE e.playerName = :usr AND e.gameID = g.id');
		$statement->execute(array(
				'usr' => $args['username']
			));
		$arr = $statement->fetchAll(PDO::FETCH_ASSOC);

		return $response->write(json_encode($arr));
	}
);

$app->delete('/deleteUser', 
	function($request, $response, $args){
		
		$db = $this->dbConn;

		$statement = $db->prepare('SELECT * FROM user WHERE name=:usr');
		$statement->execute(array('usr'=>$request->getParam('username')));
		
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(empty($result)){
			return $response->write('No such user');
		}

		$statement = $db->prepare('SELECT salt, hash FROM user WHERE name = :nm');
		$statement->execute(array(
			'nm' => $request->getParam('username'),
		));

		$item = $statement->fetch(PDO::FETCH_ASSOC);
		$salt = $item['salt'];

		$hash = hash('sha256', $request->getParam('password') . $salt);

		if($hash == $item['hash']){
			$statement = $db->prepare('DELETE FROM user WHERE name=:name');
			$statement->execute(array('name' => $request->getParam('username')));
			return $response->write('Deleted!');
		} else {
			return $response->write('wrong pass');
		}


			
	}
);


$app->delete('/deleteGame',
	function($request, $response, $args){
		
		$db = $this->dbConn;
		$statement = $db->prepare('DELETE FROM game WHERE id=:id');
		$statement->execute(array('id' => $request->getParam('id')));

		$statement = $db->prepare('DELETE FROM enlist WHERE gameID=:id');
		$statement->execute(array('id' => $request->getParam('id')));

		return $response->write('Deleted.'); 

	}

);

$app->post('/createGame',
	function($request, $response, $args){
		$db = $this->dbConn;

		$time = explode(".", explode("T", $request->getParam('time'))[1])[0];

		$arr = explode(":", $time);
		$arr[0] = intval($arr[0])-6;
		if($arr[0] < 0){
			$arr[0] = $arr[0] + 24;
		}

		$time = strval($arr[0]) . ":" . $arr[1] . ":" . $arr[2];

		$statement = $db->prepare('INSERT INTO game(sport, time, playerCount, location, date, full) values (:sport, :time, :count, :loc, CURDATE(), FALSE)');
		$statement->execute(array(
				'sport' => $request->getParam('sport'),
				'time' => $time,
				'loc' => $request->getParam('location'),
				'count' => $request->getParam('playerCount')
		));

		$select = $db->prepare('SELECT max(id) from game');
		$select->execute();
		$id = $select->fetch(PDO::FETCH_ASSOC)['max(id)'];

		$statement = $db->prepare('INSERT INTO enlist(playerName, gameID) values(:name, :id)');
		$statement->execute(array(
				'name' => $request->getParam('hostName'),
				'id' => $id
		));

		return $response->write(json_encode($request->getParams()) . "Success!" . $time);
	}
);

$app->post('/login',
	function($request, $response, $args){
		$db = $this->dbConn;

		$statement = $db->prepare('SELECT * FROM user WHERE name=:usr');
		$statement->execute(array('usr'=>$request->getParam('name')));
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(empty($result)){
			return $response->write('failed');
		}

		$statement = $db->prepare('SELECT salt, hash FROM user WHERE name = :nm');
		$statement->execute(array(
			'nm' => $request->getParam('name')
		));

		$item = $statement->fetch(PDO::FETCH_ASSOC);
		$salt = $item['salt'];

		$hash = hash('sha256', $request->getParam('pwd') . $salt);

		if($hash == $item['hash']){

			$statement = $db->prepare('INSERT into login(login, username) values(NOW(), :usr)');
			$statement->execute(array('usr'=>$request->getParam('name')));

			$sessionKey = randomBitString();
			$statement = $db->prepare('INSERT into session(username, sessionKey) values(:usr, :sk)');
			$statement->execute(array('usr'=>$request->getParam('name'), 'sk'=>$sessionKey));

			return $response->write($sessionKey);
		} else {
			return $response->write('failed');
		}
	}
);

$app->post('/logout',
	function($request, $response, $args){
		$db = $this->dbConn;
		$statement = $db->prepare('DELETE FROM session WHERE username = :usr AND sessionKey = :sk');
		$statement->execute(array('usr'=>$request->getParam('username'), 'sk' => $request->getParam('sessionKey')));
	}
);

$app->post('/addUserToGame',
	function($request, $response, $args){
		$db = $this->dbConn;

		$username = $request->getParam('username');
		$id = $request->getParam('gameID');

		$statement = $db->prepare('INSERT into enlist(playerName, gameID) values(:username, :gameID)');
		$statement->execute(array(
				'username' => $username,
				'gameID' => $id
		));

		$statement = $db->prepare('SELECT count(playerName) FROM enlist WHERE gameID = :gameID');
		$statement->execute(array(
				'gameID' => $id
		));
		$count = $statement->fetch(PDO::FETCH_ASSOC);

		$statement = $db->prepare('UPDATE game SET full = TRUE WHERE id = :gameID AND playerCount <= :count');
		$statement->execute(array(
				'count' => $count,
				'gameID' => $id
		));

		return $response->write("Success!");
	}
);

$app->delete('/deleteUserFromGame',
	function($request, $response, $args){
		$db = $this->dbConn;
		$statement = $db->prepare('DELETE FROM game WHERE gameID=:gid AND username=:usr');
		$statement->execute(array('usr' => $request->getParam('username'), 'gid' => $request->getParam('gameID')));
		return $response->write('Deleted.'); 
	}
);
