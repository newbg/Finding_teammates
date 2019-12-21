<?php 

include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$open_id = $_GET['open_id'];
$word = $_GET['word'];
$data = [];
$t = array('collect' => 'true' , 'changeAgree' => 'true' );
$f = array('collect' => 'false' , 'changeAgree' => 'false' );
$total = 0;

$sql = "SELECT * FROM team WHERE game_name LIKE '%$word%' OR req LIKE '%$word%' OR team_info LIKE '%$word%' ";
$result = mysqli_query($con,$sql);
while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)) 
{
	$add = array_merge($row,$f);
	$data[] =$row;
	$total++;
}

//查询该用户是否收藏
$sql = "SELECT * FROM collect WHERE open_id='$open_id' ";
$result = mysqli_query($con,$sql);
while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)) 
{
	for ($i=0; $i < $total; $i++) 
	{ 
		if ($row['team_id'] == $data[$i]['id']) 
		{
			$data[$i]['collect'] = "true";
			$data[$i]['changeAgree'] = "true";
		}
	}
}

$data = json_encode($data,JSON_UNESCAPED_UNICODE);
echo $data;






 ?>