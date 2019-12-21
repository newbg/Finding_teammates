<?php 

    $code = $_GET["code"];
    $appid = "wx651b3dc1d22a2d91";
    $secret = "624ff7d298a704e4b0012f52806198b8";
    $get_token_url = "https://api.weixin.qq.com/sns/jscode2session?appid=$appid&secret=$secret&js_code=$code&grant_type=authorization_code";

    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$get_token_url);
    curl_setopt($ch,CURLOPT_HEADER,0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    $res = curl_exec($ch);
    curl_close($ch);
    $json_obj = json_decode($res,true);
	$open_id = $json_obj["openid"];
    echo $open_id;
   
            

 ?>