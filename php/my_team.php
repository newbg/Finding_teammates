<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8" ;
mysqli_set_charset( $con , $program_char );

$open_id = $_GET['open_id'];

$data = [];
$sql = "SELECT * FROM team WHERE id IN( SELECT team_id FROM myteam WHERE open_id='$open_id' )";
$result = mysqli_query($con,$sql);
while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)) 
{
	$data[] = $row;
}
$data = json_encode($data,JSON_UNESCAPED_UNICODE);
echo $data;

 ?>