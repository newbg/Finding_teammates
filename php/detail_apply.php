<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);


$id = $_GET['id'];

$sql = "SELECT * FROM application WHERE id='$id' ";
$result = mysqli_query($con,$sql);

$row = mysqli_fetch_array($result,MYSQL_ASSOC);

$row = json_encode($row,JSON_UNESCAPED_UNICODE);
echo $row;





 ?>