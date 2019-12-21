<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$open_id = $_POST['open_id'];
$sort = $_POST['sort'];
$game_name = $_POST['game_name'];
$tele_num = $_POST['tele_num'];
$req = $_POST['req'];
$team_info = $_POST['team_info'];
$team_num = $_POST['team_num'];
$max_num = $_POST['max_num'];

$sql = "INSERT INTO team VALUES".
		"(null,'$sort','$game_name','$tele_num','$req','$team_info','$team_num','$max_num','$open_id')";

$result = mysqli_query($con,$sql);

//获取插入的id
$team_id = mysqli_insert_id($con);

$sql = "INSERT INTO myteam VALUES".
		"(null,'$team_id','$open_id','true')";
mysqli_query($con,$sql);

if ($result) 
{
	echo "success";
}
else
{
	echo "fail";
}



 ?>