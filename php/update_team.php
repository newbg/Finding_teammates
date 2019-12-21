<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$id = $_GET['id'];
$open_id = $_GET['open_id'];
$sort = $_GET['sort'];
$game_name = $_GET['game_name'];
$tele_num = $_GET['tele_num'];
$req = $_GET['req'];
$team_info = $_GET['team_info'];
$team_num = $_GET['team_num'];
$max_num = $_GET['max_num'];

$sql = "UPDATE team SET sort='$sort',game_name='$game_name',tele_num='$tele_num',req='$req',team_info='$team_info',team_num='$team_num',max_num='$max_num',open_id='$open_id' WHERE id=$id ";
$result = mysqli_query($con,$sql);
if ($result) {
	echo "success";
}
else{
	echo "fail";
}






 ?>