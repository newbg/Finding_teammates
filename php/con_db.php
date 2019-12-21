<?php 

function connection()
{
	$dbhost = "127.0.0.1:3306";//数据库位置
	$dbname = "root";//账号
	$dbpass = "XU_175";//密码
	$db = "weixin";//数据库名称
	$con = mysqli_connect($dbhost,$dbname,$dbpass,$db);
	return $con;
}


 ?>