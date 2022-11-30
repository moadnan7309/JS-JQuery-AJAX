<?php
// include "header.php";
?>
<div class="container" style=margin-top:2% >
<div class="rows">
<h1>Add Category</h1>
<form action="" method="post" enctype="multipart/form-data">
<level>Name</level>
<input type="text" name="name"  /><br><br>
<level>Upload Photo</level>
<input type="file" name="file" required /><br><br>
<input type="submit" name="submit" value="save" class="btn btn-primary" />
</form>
</div>
</div>
<?php
if($_POST)
{
    $name=$_POST['name'];
    $prm=$_FILES['file']['name'];
    $tmp=$_FILES['file']['tmp_name'];
    $folder="uploads/";
    $merge=$folder.$prm;
    move_uploaded_file($tmp,$merge);
    $check_name=preg_match("/^[a-zA-Z]{3,30}$/",$name);
    if($check_name)
    {
        $c=mysqli_connect("localhost","root","","database");
        if(mysqli_query($c,"insert into demo(id,name,file) values('','$name','$merge')"))
        {
            echo "saved";
        }
        else
        {
            mysqli_error($c);
        }
       
    }
    else
    {
        echo "invalid";
    }
}
// include "footer.php";
?>