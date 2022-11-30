<?php
include_once("db_connection.php");
$record_per_page = 4;
$page='';
$message='';
$data = array();
if (isset($_POST["page"])) { 
	$page  = $_POST["page"]; 
} else { 
	$page=1; 
};  
$start_from = ($page-1) * $record_per_page;
$sqlQuery = "select * from employee  ORDER BY id DESC LIMIT $start_from,$record_per_page";
$result = mysqli_query($c, $sqlQuery);
$page_query = "select * from employee";
$page_result = mysqli_query($c, $page_query);
$total_records = mysqli_num_rows($page_result);
$total_pages = ceil($total_records/$record_per_page);
if (isset($_POST['search']))
{
	$page_query .= " where user_name LIKE '{$_POST['search']}%'or first_name LIKE '{$_POST['search']}%' or last_name LIKE '{$_POST['search']}%' or dob LIKE '{$_POST['search']}%'  LIMIT 100";
    $result =  mysqli_query($c, $page_query);
    if (mysqli_num_rows($result) > 0){
      while($row = mysqli_fetch_assoc($result))
      {
        $data[] = $row;
      }
    }
    else
    {
      $message = "No Matching Records Found";
    }
}
while($row = mysqli_fetch_assoc($result))
{
  $data[] = $row;
}
$All = array("data"=>$data, "message"=>$message, "current_page"=>$page, "total_pages"=>$total_pages, "record_per_page"=>$record_per_page, "total_records"=>$total_records);
echo json_encode($All);






// include('db_connection.php');

//   if (isset($_POST['query'])) {
//       $query = "select * from employee where user_name LIKE '{$_POST['query']}%' or first_name LIKE '{$_POST['query']}%' or last_name LIKE '{$_POST['query']}%' or dob LIKE '{$_POST['query']}%'  LIMIT 100";
//       $result = mysqli_query($c, $query);
//     if (mysqli_num_rows($result) > 0) {
//         // while ($res = mysqli_fetch_array($result)) {
//         // echo $res['user_name']."<br/>";
//     //   }
//         while(mysqli_num_rows($result) > 0){
//             $data[] = $res;
//         }
//     } else {
//       echo "
//       <div class='alert alert-danger mt-3 text-center' role='alert'>
//       No Matching Records Found
//       </div>
//       ";
//     }
//     echo json_encode($data);
//   }
?>