<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8" ;
mysqli_set_charset( $con , $program_char );

$open_id = $_GET['open_id'];

$data = [];
$t = array('collect' => 'true' , 'changeAgree' => 'true' );
$f = array('collect' => 'false' , 'changeAgree' => 'false' );
$sql = "SELECT * FROM team WHERE id IN (SELECT team_id FROM collect WHERE open_id='$open_id' )";
$result = mysqli_query($con,$sql);
while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)) 
{
	$add = array_merge($row,$t);
	$data[] = $add;
}
$sql = "SELECT * FROM team WHERE id NOT IN (SELECT team_id FROM collect WHERE open_id='$open_id' )";
$result = mysqli_query($con,$sql);
while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)) 
{
	$add = array_merge($row,$f);
	$data[] = $add;
}
array_multisort($data);
$data = json_encode($data,JSON_UNESCAPED_UNICODE);
echo $data;


 ?>