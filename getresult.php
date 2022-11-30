<?php
include ("db_connection.php");
include ("pagination.class.php");
$perPage = new PerPage();
$sql = "SELECT * from employee";
$paginationlink = "getresult.php?page=";
$page = 1;
if (! empty($_GET["page"])) {
    $page = $_GET["page"];
}
$start = ($page - 1) * $perPage->perpage;
if ($start < 0) {
    $start = 0;
}
$statement = $c->prepare($sql);
$statement->execute();
$result = $statement->get_result();
?>

<?php
$perpageresult = $perPage->perpage($result->num_rows, $paginationlink);
?>

<?php
$query = $sql . " limit " . $start . "," . $perPage->perpage;
$statement = $c->prepare($query);
$statement->execute();
$result = $statement->get_result();
$output = '';
while ($row = mysqli_fetch_array($result)) {
    $output .= '<div class="question"><input type="hidden" id="rowcount" name="rowcount" value="' . $result->num_rows . '" />' . $row["first_name"] . '</div>';
    $output .= '<div class="answer">' . $row["last_name"] . '</div>';
}
if (! empty($perpageresult)) {
    $output .= '<div id="pagelink">' . $perpageresult . '</div>';
}
print $output;
?>

<script>
    success: function(data){
	$("#pagination").html(data);
}
</script>
<div id="pagination">
</div>