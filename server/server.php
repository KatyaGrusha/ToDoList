<?php
 $mysqli = new mysqli("localhost", "root", "", "todolist");

// if(isset($_POST["registration"]))
// 	{
 $save = $_GET['save'];
if ($save != NULL){
 		$name = $_GET['name'];
 		$login = $_GET['login'];
 		$email = $_GET['email'];
 		$password = $_GET['password'];
 		$passHach = password_hash($password, PASSWORD_DEFAULT);

		$success =  $mysqli->query("SELECT COUNT(*) AS `login` FROM `person` WHERE `login` = '".$login."'");
		$successEmail =  $mysqli->query("SELECT COUNT(*) AS `email` FROM `person` WHERE `email` = '".$email."'");
		$loginrow = $success->fetch_assoc();
		$emailrow = $successEmail->fetch_assoc();

		if ($loginrow['login'] > 0){
  				echo "yes login";
			}
		else if ($emailrow['email'] > 0){
  				echo "yes email";
			}
		else{
				$success =  $mysqli->query("INSERT INTO `person` (`name`, `login`, `email`,`password`) VALUES ('".$name."', '".$login."', '".$email."', '".$passHach."');");
				echo "good";
 			}
	}
$mysqli->close();
?>