<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$team_id = $_GET['team_id'];

$data = [];
$sql = "SELECT jopen_id,name,avatarUrl FROM application WHERE team_id='$team_id' AND jopen_id IN( SELECT open_id FROM myteam WHERE team_id='$team_id') ";
$result = mysqli_query($con,$sql);
while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)) 
{
	$data[] = $row;
}

$data = json_encode($data,JSON_UNESCAPED_UNICODE);
echo $data;



 ?>