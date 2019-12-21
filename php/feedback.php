<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$open_id = $_GET['open_id'];
$feedback = $_GET['feedback'];

$sql = "INSERT INTO feedback VALUES (null,'$open_id','$feedback')";
mysqli_query($con,$sql);






 ?>