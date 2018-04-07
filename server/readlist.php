<?php

$mysqli = new mysqli("localhost", "root", "", "todolist");

// $data    = $_POST["result"];
// $data    = json_decode("$data", true);

$data    = $_POST["read"];

$result = $mysqli->query("SELECT `task`,`flag` FROM `task` WHERE `login`= '".$data."' ; ");

// $mysqli->query("INSERT INTO `task` ( `task`, `flag`) VALUES (  '".$data["msg"]."', '".$data["flag"]."' );");

$array_data = $result->fetch_all();


$v= json_encode($array_data);
echo $v;
$mysqli->close();
?>