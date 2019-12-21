<?php 

    $code = $_GET["code"];
    $appid = "wx9e0ea16a97542e97";
    $secret = "16f8d5c8ca654b1c8d7c3ed81af1aeb0";
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