<?php

//连接数据库设置编码
include("con_db.php");
$con = connection();
$program_char = "utf8";
mysqli_set_charset($con,$program_char);

$open_id = $_GET['open_id'];

$t = array('collect' => 'true' , 'changeAgree' => 'true' );
$f = array('collect' => 'false' , 'changeAgree' => 'false' );
$data = [];
$i=0;
$sql = "SELECT * FROM team ORDER BY id DESC";
$result = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($result,MYSQL_ASSOC))
{
	if($i<5)
	{
		$add = array_merge($row,$f);
		$data[] = $add;
		$i++;
	}
	else
	{
		break;
	}
}
$sql = "SELECT * FROM collect WHERE open_id='$open_id' ";
$result = mysqli_query($con,$sql);
while ($row = mysqli_fetch_array($result,MYSQL_ASSOC)) {
	for ($i=0; $i < 5; $i++) 
	{ 
		if ($row['team_id'] == $data[$i]['id']) {
			$data[$i]['collect'] = "true";
			$data[$i]['changeAgree'] = "true";
		}
	}
}

//json编码
$data = json_encode($data,JSON_UNESCAPED_UNICODE);
echo $data;







?>