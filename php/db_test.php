<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8" ;
mysqli_set_charset( $con , $program_char );

$sql = "SELECT * FROM test";
$result = mysqli_query($con,$sql);
while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)) {
	echo $row['id'].$row['cha'].$row['nu'].$row['te'];
}


 ?>