<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$status = $_GET['status'];//状态，同意返回agree拒绝返回refuse
$id = $_GET['id'];
$team_id = $_GET['team_id'];

$sql = "UPDATE application SET status='$status' WHERE id=$id ";
$result = mysqli_query($con,$sql);


if ($status == "agree") {
	//同意，队伍人数加一
	$sql = "UPDATE team SET team_num=team_num+1 WHERE id=$team_id ";
	$result = mysqli_query($con,$sql);
	//插入到我的队伍表
	$sql = "SELECT team_id,jopen_id FROM application WHERE id=$id ";
	$result = mysqli_query($con,$sql);
	$row = mysqli_fetch_array($result,MYSQL_ASSOC);
	$team_id = $row['team_id'];
	$jopen_id = $row['jopen_id'];
	$sql = "INSERT INTO myteam VALUES (null,'$team_id','$jopen_id','false')";
	mysqli_query($con,$sql);
}






 ?>