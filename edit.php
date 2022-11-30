<?php 
include('db_connection.php');
$data =stripslashes(file_get_contents("php://input"));
$my_edit_data = json_decode($data,true);
$id = $my_edit_data['id'];
$sql = mysqli_query($c,"select * from employee where id = {$id}");
$row = $sql->fetch_assoc();
echo json_encode($row);
?>