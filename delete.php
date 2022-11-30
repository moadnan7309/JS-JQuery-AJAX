<?php 
include('db_connection.php');
$data =stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data,true);
$id = $mydata['sid'];

if(!empty($id))
{
    $sql = mysqli_query($c,"delete from employee where id = {$id}");
}
else
{
    echo "id not pass";
}
?>