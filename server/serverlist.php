<?php

$mysqli = new mysqli("localhost", "root", "", "todolist");


$data    = $_POST["result"];

$del    = $_POST["del"];


if ($del){
	$mysqli->query("DELETE FROM `task` WHERE `login` = '".$del."';");
}

if($data){
// $data    = json_decode("$data", true);
	$mysqli->query("INSERT INTO `task` ( `login`, `task`, `flag`) VALUES (  '".$data["login"]."', '".$data["msg"]."', '".$data["flag"]."' );");
// $v= json_encode($data);
}
$mysqli->close();
?>