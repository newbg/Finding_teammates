<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$team_id = $_GET['team_id'];
$open_id = $_GET['open_id'];
$data = [];

$t = array('collect' => 'true' , 'changeAgree' => 'true' );
$f = array('collect' => 'false' , 'changeAgree' => 'false' );
$at = array('ap' => 'true');
$af = array('ap' => 'false');

$sql = "SELECT * FROM team WHERE id='$team_id' ";
$result = mysqli_query($con,$sql);
$row = mysqli_fetch_array($result,MYSQL_ASSOC);

$sql = "SELECT * FROM collect WHERE open_id='$open_id' AND team_id='$team_id' ";
$result = mysqli_query($con,$sql);
$rows = mysqli_fetch_array($result,MYSQL_ASSOC);
if (empty($rows)) 
{
	$add = array_merge($row,$f);
}
else
{
	$add = array_merge($row,$t);
}
$sql = "SELECT id FROM application WHERE team_id='$team_id' AND jopen_id='$open_id' AND status!='refuse' ";
$result = mysqli_query($con,$sql);
$rowss = mysqli_fetch_array($result,MYSQL_ASSOC);
if (empty($rowss)) {
	$add = array_merge($add,$af);
}
else
{
	$add = array_merge($add,$at);
}
$data[] = $add;
$data = json_encode($data,JSON_UNESCAPED_UNICODE);
echo $data;





 ?>