<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$open_id = $_GET['open_id'];
$team_id = $_GET['team_id'];
$collect = $_GET['collect'];

if ($collect=="true") 
{
	$sql = "INSERT INTO collect VALUES".
			"(NULL,'$open_id','$team_id')";
	$result = mysqli_query($con,$sql);
	}
else
{
	$sql = "SELECT id FROM collect WHERE team_id='$team_id' AND open_id='$open_id' ";
	$result = mysqli_query($con,$sql);
	while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)) {
		$id = $row['id'];
	}
	$sql = "DELETE FROM collect WHERE id IN ($id)";
	$result = mysqli_query($con,$sql);

	
}


 ?>