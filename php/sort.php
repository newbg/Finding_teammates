<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$sort = $_GET['sort'];

$sql = "SELECT * FROM team WHERE sort=$sort";
$result = mysqli_query($con,$sql);

$data = [];
while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)) {
	$data[] = $row;
}



 ?>