<?php
 $mysqli = new mysqli("localhost", "root", "", "todolist");

 $save = $_GET['save'];
if ($save != NULL){
 		$login = $_GET['login'];
 		$password = $_GET['password'];
		// $success =  $mysqli->query("SELECT COUNT(*) AS `login` FROM person WHERE `login`='".$login."' AND `password`='".$password."'");
		$success =  $mysqli->query("SELECT COUNT(*) AS `login` FROM person WHERE `login`='".$login."' ");
		$loginrow = $success->fetch_assoc();
		if ($loginrow['login'] > 0){
  				$successPassword =  $mysqli->query("SELECT `password` FROM person WHERE `login`='".$login."' ");
  				$array_data = mysqli_fetch_array($successPassword);
  				if(password_verify ($password , $array_data[0])){
					echo "yes login";

  				}
  				else{
  					echo "no password";
  				}
  			}
			else{
				echo "no login";
			}
	}
$mysqli->close();
?>