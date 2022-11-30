document.onreadystatechange = function() {
    var state = document.readyState
    if (state == 'interactive') {
        $('#content').css("visibility", "hidden");
    } else if (state == 'complete') {
        setTimeout(function() {
            $('#interactive');
            $('#loader').css("visibility", "hidden");
            $('#content').css("visibility", "visible");
        }, 1000);
    }
}

let btnArr = [];
var row = [];
$(document).ready(function() {
    $('form input').blur(function() {
        var id = $(this).attr("id");
        if ($(this).val() == '') {
            if (id == "user_name") {
                $("#user_name").css('border', '1px solid red');
                $("#msg_user_name").text("Please fill User Name");
            } else if (id == "first_name") {
                $("#first_name").css('border', '1px solid red');
                $("#msg_first_name").text("Please fill First Name");
            } else if (id == "last_name") {
                $("lastuser_name").css('border', '1px solid red');
                $("#msg_last_name").text("Please fill Last Name");
            } else if (id == "dob") {
                $("#dob").css('border', '1px solid red');
                $("#msg_dob").text("Please fill Date of Birth");
            } else if (id == "date_joining") {
                $("#date_joining").css('border', '1px solid red');
                $("#msg_date_joining").text("Please fill Date of Joining");
            } else if (id == "file") {
                $("#file").css('border', '1px solid red');
                $("#msg_file").text("Please Select File");
            }
            // error = true;

        } else {
            if (id == "user_name") {
                $("#user_name").css('border', '1px solid green');
                $("#msg_user_name").hide();
            } else if (id == "first_name") {
                $("#first_name").css('border', '1px solid green');
                $("#msg_first_name").hide();
            } else if (id == "last_name") {
                $("#last_name").css('border', '1px solid green');
                $("#msg_last_name").hide();
            } else if (id == "dob") {
                $("#dob").css('border', '1px solid green');
                $("#msg_dob").hide();
            } else if (id == "date_joining") {
                $("#date_joining").css('border', '1px solid green');
                $("#msg_date_joining").hide();
            } else if (id == "file") {
                $("#file").css('border', '1px solid green');
                $("#msg_file").hide();
            }
            // error = false;
        }
    });

    // $("#form_id").validate({
    //     rules: {
    //         user_name: { numericOnly: true },
    //         first_name: { lettersonly: true },
    //         last_name: { lettersonly: true },
    //         file: { extension: true },
    //     }
    // });
    // $.validator.addMethod('numericOnly', function(value) {
    //     return /^[a-z0-9]+$/.test(value);
    // }, 'Please only enter Alphabet or numeric values');
    // $.validator.addMethod('lettersonly', function(value) {
    //     return /^[a-zA-Z]+$/i.test(value);
    // }, 'Please only enter Alphabet values (A-Z or a-z)');
    // $.validator.addMethod("extension", function(value, element, param) {
    //     param = typeof param === "string" ? param.replace(/,/g, '|') : "pdf";
    //     return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
    // }, 'Please Select only pdf File');

    show_data();

    function show_data(page) {
        var body_row = '';
        var link = '';
        $.ajax({
            url: "show_data.php",
            type: "POST",
            dataType: "json",
            data: { page: page },
            success: function(response) {
                var x = response.data;
                console.log(response);
                for (i = 0; i < x.length; i++) {
                    body_row += '<tr><td>' + x[i].id + '</td><td>' + x[i].uniq_id + '</td><td>' + x[i].user_name + '</td><td>' + x[i].first_name + ' ' + x[i].last_name + '</td><td>' + x[i].dob + '</td><td>' + x[i].date_joining + '</td><td>' + x[i].submit_date + ' ' + x[i].submit_time + '</td><td><a href=' + x[i].file + '>' + x[i].file + '</a></td><td><button class="btn btn-info btn_edit" id=' + x[i].id + '><i class="fa fa-edit"></i></button> <button class="btn btn-danger btn_del" data-sid=' + x[i].id + '><i class="fa fa-trash"></i></button></td></tr>';
                }
                $("#body").html(body_row);
                link += '<li class="page-item"><a class="page-link pre_link" >Pre</a></li>';
                for (i = 1; i <= response.total_pages; i++) {
                    link += ' <li class="page-item"><a class="page-link pagination_link" id="' + i + '">' + i + '</a></li>';
                }
                link += '<li class="page-item"><a class="page-link next_link" >Next</a></li>';
                $(".pagination").html(link);
                $(document).on("click", ".pagination_link", function() {
                    var page = $(this).attr("id");
                    show_data(page);
                });
                $(document).on("click", ".pre_link", function() {
                    if (response.current_page > 1) {
                        var Number = parseInt(response.current_page);
                        var page = Number - 1;
                        console.log(page);
                        show_data(page);
                    }
                });
                $(document).on("click", ".next_link", function() {
                    if (response.total_pages != response.current_page) {
                        var Number = parseInt(response.current_page);
                        var page = Number + 1;
                        console.log(page);
                        show_data(page);
                    }
                });
            }
        });
    }

    $("#search_key").keyup(function() {
        var search = $(this).val();
        var body_row = '';
        if (search != '') {
            $.ajax({
                url: "show_data.php",
                method: "POST",
                data: { search: search },
                dataType: "json",
                success: function(response) {
                    // console.log(response);
                    var x = response.data;
                    for (i = 0; i < x.length; i++) {
                        body_row += '<tr><td>' + x[i].id + '</td><td>' + x[i].uniq_id + '</td><td>' + x[i].user_name + '</td><td>' + x[i].first_name + ' ' + x[i].last_name + '</td><td>' + x[i].dob + '</td><td>' + x[i].date_joining + '</td><td>' + x[i].submit_date + ' ' + x[i].submit_time + '</td><td><a href=' + x[i].file + '>' + x[i].file + '</a></td><td><button class="btn btn-info btn_edit" id=' + x[i].id + '><i class="fa fa-edit"></i></button> <button class="btn btn-danger btn_del" data-sid=' + x[i].id + '><i class="fa fa-trash"></i></button></td></tr>';
                    }
                    $("#body").html(body_row);
                    $("#msg").text(response.message);
                    $("#msg").css("display", "block");
                }
            });
        } else {
            show_data();
            $("#msg").css("display", "none");
        }
    });

    $("#file").change(function() {
        var file = this.files[0];
        var fileType = file.type;
        var match = ['application/pdf'];
        if (!((fileType == match[0]))) {
            alert('Sorry, only PDF files are allowed to upload.');
            $("#file").val('');
            return false;
        }
    });

    $('#form_id').on('submit', function(event) {
        event.preventDefault();
        var uniq_id = Math.random().toString(13).slice(3);
        var currentTime = new Date()
        var hours = currentTime.getHours()
        var minutes = currentTime.getMinutes()
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        var submit_time = hours + ":" + minutes + " ";
        if (hours > 11) {
            submit_time += "PM";
        } else {
            submit_time += "AM";
        }
        var submit_date = currentTime.toDateString();
        var form_data = new FormData(this);
        form_data.append('uniq_id', uniq_id);
        form_data.append('submit_time', submit_time);
        form_data.append('submit_date', submit_date);
        if ($.trim($("#user_name").val()) === "" || $.trim($("#first_name").val()) === "" || $.trim($("#last_name").val()) === "" || $.trim($("#dob").val()) === "" || $.trim($("#date_joining").val()) === "" || $.trim($("#file").val()) === "") {
            alert("Please all Input Field is Required");
        } else {

            $.ajax({
                url: "insert.php",
                method: "POST",
                dataType: "text",
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                success: function(data) {
                    // console.log(data);
                    show_data();
                },
                error: function(err) {
                    console.log(err);
                }
            });
            $('#form_id').trigger("reset");
        }
    });
    $("body").on("click", ".btn_del", function() {
        let id = $(this).attr("data-sid");
        // console.log(id);
        mydata = { sid: id };
        $.ajax({
            url: "delete.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success: function(data) {
                // console.log(data);
                show_data();
            },
        });
    });
    $("body").on("click", ".btn_edit", function() {
        let id = $(this).attr("id");
        // console.log(id);
        my_edit_data = { id: id };
        // console.log(my_edit_data);
        let frm = $("#form_id");
        $.ajax({
            url: "edit.php",
            method: "POST",
            dataType: "json",
            data: JSON.stringify(my_edit_data),
            success: function(data) {
                // console.log(data);
                $("#user_name").val(data.user_name);
                $("#first_name").val(data.first_name);
                $("#last_name").val(data.last_name);
                $("#dob").val(data.dob);
                $("#date_joining").val(data.date_joining);
            },
        });
        $("#submit").hide();
        let btn = '<button class="update btn btn-primary" for="' + id + '">Update</button>';
        btnArr.push(btn);
        if (btnArr.length == 1) {
            frm.append(btn);
        }
    });

    $(document).on('click', '.update', function(el) {
        el.preventDefault();
        // console.log(this);
        var id = $(this).attr("for");
        // console.log(id);
        let user_name_value = $("#user_name").val();
        let first_name_value = $("#first_name").val();
        let last_name_value = $("#last_name").val();
        let dob_value = $("#dob").val();
        let date_joining_value = $("#date_joining").val();
        mydata = { id: id, user_name: user_name_value, first_name: first_name_value, last_name: last_name_value, dob: dob_value, date_joining: date_joining_value };
        // console.log(mydata);
        $.ajax({
            url: "update.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success: function(data) {
                // console.log(data);
                show_data();
            },
        });
        $('#form_id').trigger("reset");
        $("#submit").show();
        $(".update").remove();
        btnArr = [];
    });
});