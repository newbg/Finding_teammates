<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$jopen_id = $_GET['jopen_id'];
$team_id = $_GET['team_id'];

$sql = "SELECT * FROM application WHERE jopen_id='$jopen_id' AND team_id='$team_id' ";
$result = mysqli_query($con,$sql);
$data = mysqli_fetch_array($result,MYSQL_ASSOC);
$data = json_encode($data,JSON_UNESCAPED_UNICODE);
echo $data;



 ?>