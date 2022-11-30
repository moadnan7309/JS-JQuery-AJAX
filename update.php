<?php 
include('db_connection.php');

$data =stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data,true);
$id = $mydata['id'];
$user_name = $mydata['user_name'];
$first_name = $mydata['first_name'];
$last_name = $mydata['last_name'];
$dob = $mydata['dob'];
$date_joining = $mydata['date_joining'];
$sql = mysqli_query($c,"update employee SET user_name='$user_name', first_name='$first_name', last_name='$last_name', dob='$dob', date_joining='$date_joining' where id = {$id}");
if($sql==True)
{
    echo "updated";
}
else
{
    echo "Not Saved";
}
?>