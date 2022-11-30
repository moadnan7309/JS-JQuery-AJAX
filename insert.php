<?php 
include('db_connection.php');

// $data =stripslashes(file_get_contents("php://input"));
// $mydata = json_decode($data,true);

// $uniq_id = $mydata['uniq_id'];
// $user_name = $mydata['user_name'];
// $first_name = $mydata['first_name'];
// $last_name = $mydata['last_name'];
// $dob = $mydata['dob'];
// $date_joining = $mydata['date_joining'];
// $submit_time = $mydata['submit_time'];
// $submit_date = $mydata['submit_date'];


$uniq_id = $_POST['uniq_id'];
$user_name = $_POST['user_name'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$dob = $_POST['dob'];
$date_joining = $_POST['date_joining'];
$submit_time = $_POST['submit_time'];
$submit_date = $_POST['submit_date'];

$file    = $_FILES['file']['name'];
// $folder="uploads/";
// $path=$folder.$file;

$sql = mysqli_query($c,"insert into employee(id,uniq_id,user_name,first_name,last_name,dob,date_joining,submit_time,submit_date,file) values('','$uniq_id','$user_name','$first_name','$last_name','$dob','$date_joining','$submit_time','$submit_date','$file')");
// echo $sql==False;

if($sql==True)
{
    move_uploaded_file($_FILES['file']['tmp_name'],"$file");
    echo "Saved";
}
else
{
    echo "Not Saved";
}


?>