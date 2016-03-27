<?php
$link = mysqli_connect("104.236.10.218","root","Database","pickup");

if(!$link){

    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

//Need to change file and table name in the query below.
//File names: enlist.csv,game.csv,sportPreference.csv,user.csv
$sql = "LOAD DATA LOCAL INFILE 'enlist.csv'
        INTO TABLE enlist
        FIELDS TERMINATED BY ','
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES ";

$result = mysqli_query($link, $sql);
if (mysqli_affected_rows($link) >= 1){

    $message = "Data added";

} else {

    $message = mysqli_error($link);
}

echo $message;
mysqli_close($link);

?> 