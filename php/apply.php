<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$team_id = $_GET['team_id'];
$jopen_id = $_GET['jopen_id'];//当前用户openid
$popen_id = $_GET['popen_id'];//队长的openid
$reason = $_GET['reason'];
$contact = $_GET['contact'];
$name = $_GET['name'];
$avatarUrl = $_GET['avatarUrl'];

$sql = "INSERT INTO application VALUES".
		"(null,'$jopen_id','$popen_id','$reason','wait','$team_id','$contact','$name','$avatarUrl') ";
$result = mysqli_query($con,$sql);
if($result)
{
	echo "su";
}
else{
	die(mysqli_error());
}





 ?>