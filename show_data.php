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












// $output .= "<table class='table table-hover table-bordered' id=table_id'>
// <thead>
// 	<tr>
// 		<th>Sr.No</th>
// 		<th>Uniq Id</th>
// 		<th>User Name</th>
// 		<th>Full Name</th>
// 		<th>Date of Birth</th>
// 		<th>Date Joining</th>
// 		<th>Submit Date & Time</th>
// 		<th>Resume/CV</th>
// 		<th>Action</th>
// 	</tr>
// </thead>
// <tbody id='body'>
// ";
// $output .= '<tr>
	// 	<td>'.$row["id"].'</td>
	// 	<td>'.$row["uniq_id"].'</td>
	// 	<td>'.$row["user_name"].'</td>
	// 	<td>'.$row["first_name"].' '.$row["last_name"].'</td>
	// 	<td>'.$row["dob"].'</td>
	// 	<td>'.$row["date_joining"].'</td>
	// 	<td>'.$row["submit_date"].' '.$row["submit_time"].'</td>
	// 	<td><a href='.$row["file"].'>'.$row["file"].'</a></td>
	// 	<td><button class="btn btn-info btn_edit" id='.$row["id"].'><i class="fa fa-edit"></i></button> <button class="btn btn-danger btn_del" data-sid='.$row["id"].'><i class="fa fa-trash"></i></button></td>
	// </tr>';
	// $output .= "</tbody>
// </table>";
// $output .='<nav aria-label="Page navigation example">
// <ul class="pagination">
//   <li class="page-item"><a class="page-link" id="pre" >Pre</a></li>';
// for($i=1;$i<=$total_pages;$i++)
// {
// 	// $output .="<span class='pagination_link' style='cursor:pointer;padding: 6px;border:1px solid #ccc;' id='".$i."'>".$i."</span>";
// 	$output .='<li class="page-item"><a class="page-link pagination_link" id="'.$i.'">'.$i.'</a></li>';
// }
// $output .='<li class="page-item"><a class="page-link pre_next_link">Next</a></li>
// </ul>
// </nav>';
// echo $output;
?>