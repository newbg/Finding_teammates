<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8" ;
mysqli_set_charset( $con , $program_char );

$team_id = $_GET['team_id'];

$sql = "DELETE FROM application WHERE team_id='$team_id' ";
mysqli_query($con,$sql);
$sql = "DELETE FROM collect WHERE team_id='$team_id' ";
mysqli_query($con,$sql);
$sql = "DELETE FROM team WHERE id='$team_id' ";
mysqli_query($con,$sql);
$sql = "DELETE FROM myteam WHERE team_id='$team_id' ";
mysqli_query($con,$sql);

 ?>