var sr_no = 0;
var x = 0;
let btnArr = [];
$(document).ready(function() {
    $("#submit").click(function(event) {
        event.preventDefault();
        var file;
        var image;
        sr_no++;
        let div = document.createElement("div");
        div.setAttribute("id", "dis_img" + sr_no);
        let name_value = $("input[name='name']:text").val();
        let gender_value = $("input[name='gender']:checked").val();
        let dob_value = $("#dob").val();
        let file_value = $("#file_id").val();
        if (!name_value || !gender_value || !dob_value) {
            alert("Please Enter Input Field");
        } else {
            x++;
            markup = "<tr id='row" + x + "'><td>" + sr_no + "</td><td>" + name_value + "</td><td>" + gender_value + "</td><td>" + dob_value + "</td><td id='img" + sr_no + "'></td><td><button id='delete_row" + sr_no + "'class='btn btn-danger'>Delete</button><button id='edit_row" + sr_no + "' class='btn btn-primary'>Edit</button></td></tr>";
            tableBody = $("table tbody");
            tableBody.append(markup);
            if ((file = $("#file_id")[0].files[0])) {
                image = new Image();
                image.onload = function() {
                    $(this).attr("id", "image");
                    $(this).attr("width", "100px");
                    $(this).attr("height", "100px");
                }
                image.src = URL.createObjectURL(file);

                div.append(image);
                $("#img" + sr_no).append(div);
            }
            $('#form_id').trigger("reset");
        }
        $("#delete_row" + sr_no).click(function(e) {
            e.preventDefault();
            $(this).parent().parent().remove();
            const count = $("#body")[0].children;
            let arr = Object.entries(count);
            arr.forEach((val) => {
                const [key, value] = val;
                let val_Id = Number(key) + 1;
                value.firstChild.innerHTML = val_Id;
                x = val_Id;
            });
        });
        let frm = $("#form_id");
        $("#edit_row" + sr_no).click(function() {
            var tr = $(this).closest('tr');
            var rowNumber = $(this).parents("tr").index();
            // console.log(rowNumber);
            var edit_name = tr.children('td:eq(1)').text();
            var edit_gender = tr.children('td:eq(2)').text();
            var edit_dob = tr.children('td:eq(3)').text();
            $("#name").val(edit_name);
            $('input:radio[name=gender][value=' + edit_gender + ']').attr('checked', true);
            $("#dob").val(edit_dob);
            $("#submit").hide();
            let btn = '<button class="update btn btn-primary" for="' + rowNumber + '">Update</button>';
            btnArr.push(btn);
            if (btnArr.length == 1) {
                frm.append(btn);
            }
        });
    });
    $(document).on('click', '.update', function(el) {
        el.preventDefault();
        // console.log(this);
        var rowNumber = parseInt($(this).attr("for"));
        $('td:eq(1)', 'tr:eq(' + (rowNumber + 1) + ')').html($("#name").val());
        $('td:eq(2)', 'tr:eq(' + (rowNumber + 1) + ')').html($("input[name='gender']:checked").val());
        $('td:eq(3)', 'tr:eq(' + (rowNumber + 1) + ')').html($("#dob").val());
        $('#form_id').trigger("reset");
        $("#submit").show();
        $(".update").remove();
        btnArr = [];
    });
});