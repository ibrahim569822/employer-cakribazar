<?php
include '../connection.php';
$id=$_GET['id'];

$result=$cc->common_select('seeker_profiles','*',['user_id'=>$id]);

echo json_encode([$result]);