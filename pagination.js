loader();

function loader() {
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
}

$(document).ready(function() {
    show_data();

    function show_data(page) {
        loader();
        var body_row = '';
        var link = '';
        $.ajax({
            url: "search.php",
            type: "POST",
            dataType: "json",
            data: { page: page },
            success: function(response) {
                var x = response.data;
                for (i = 0; i < x.length; i++) {
                    body_row += '<tr><td>' + x[i].id + '</td><td>' + x[i].user_name + '</td><td>' + x[i].first_name + ' ' + x[i].last_name + '</td><td>' + x[i].dob + '</td><td>' + x[i].date_joining + '</td></tr>';
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
                url: "search.php",
                method: "POST",
                data: { search: search },
                dataType: "json",
                success: function(response) {
                    console.log(response);
                    // console.log(response.message);
                    var x = response.data;
                    for (i = 0; i < x.length; i++) {
                        body_row += '<tr><td>' + x[i].id + '</td><td>' + x[i].user_name + '</td><td>' + x[i].first_name + ' ' + x[i].last_name + '</td><td>' + x[i].dob + '</td><td>' + x[i].date_joining + '</td></tr>';
                    }
                    $("#body").html(body_row);
                    $("#msg").text(response.message);
                }
            });
        } else {
            show_data();
        }
    });
});