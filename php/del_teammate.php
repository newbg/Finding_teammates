<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$teammate_id = $_GET['teammate_id'];
$team_id = $_GET['team_id'];

$sql = "DELETE FROM myteam WHERE open_id='$teammate_id' AND team_id = $team_id ";
mysqli_query($con,$sql);
$sql = "UPDATE team SET team_num=team_num-1 WHERE id=$team_id ";
$result = mysqli_query($con,$sql);



 ?>