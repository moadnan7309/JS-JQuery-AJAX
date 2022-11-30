var form = [{
    id: 1,
    date: '',
    title: '',
    notes: ''
}];
var index = 1;
var newform = [{

}];
function pushData(){
    form.push({id: index, date: '', title: '', notes: ''});
    if(form.length>1)
    {
        const element = document.getElementById("main-div").classList;
        if(element.contains("col-md-12"))
        {
            element.remove("col-md-12");
            element.add("col-md-6");
        }
    }
    index++;
    const html = `<div class="col-md-6" id="rem_div_`+index+`">
    <fieldset class="border p-2">
        <legend class="float-none w-auto p-2"><i  class="fa fa-plus" onclick="pushData()"></i>&nbsp;&nbsp;<i  class="fa fa-minus" onclick="remove_form(rem_div_`+index+`)" ></i></legend>
        <div class="form-group row">
        <label for="date" class="col-sm-2 col-form-label">Date</label>
        <div class="col-sm-10">
            <input type="date" name="date[]"  class="form-control" id="date" required>
        </div>
        </div>
        <div class="form-group row">
        <label for="title" class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-10">
            <input type="text" name="title[]" class="form-control" id="title" placeholder="Title" required>
        </div>
        </div>
        <div class="form-group row">
            <label for="notes" class="col-sm-2 col-form-label">Notes</label>
            <div class="col-sm-10">
                <textarea name="notes[]" id="" cols="30" rows="5" class="form-control" placeholder="Notes" required></textarea>
            </div>
        </div>
    </fieldset>
</div>`;
    document.getElementById("add_form").innerHTML += html;
}
function remove_form(element){
    console.log(element);
    element.remove();
}
let arr1 = [];
function form_display(dev){
    // console.log(dev);
    let fd = new FormData(dev);
    let val = [...fd.entries()];
    // console.log(val);
    // for (const key of fd.keys()) {
    //     console.log(key);
    //   }
    const date_arr = fd.getAll('date[]');
    const title_arr = fd.getAll('title[]');
    const notes_arr = fd.getAll('notes[]');
    form = [];
    date_arr.forEach((values, index) => {
        form.push({
            id: index+1,
            date: date_arr[index],
            title: title_arr[index],
            notes: notes_arr[index]
        })
    });
    // console.log(form);
    let list_div = document.getElementById("list");
    list_div.replaceChildren();
    for(let i=0;i<form.length;i++)
    {
        var border_div = document.createElement("div");
        border_div.style.width = "100%";
        border_div.style.border = "1px solid black";

        var display_div = document.createElement("div");
        display_div.setAttribute('id','disp'+form[i].id);
        border_div.appendChild(display_div);
        display_div.innerHTML="ID : "+form[i].id+"<br>"+"Date : "+form[i].date+"<br>"
        +"Title : "+form[i].title+"<br>"+"Notes : "+form[i].notes+"<br>";
        // console.log(form[i].id);
        list_div.appendChild(border_div);
        var btn_edit = document.createElement("button");
        btn_edit.style.color = "blue";
        btn_edit.innerHTML="Edit";
        btn_edit.setAttribute('data',form[i].id);
        btn_edit.onclick=function() {edit_show_modal(this)};
        border_div.appendChild(btn_edit);

        var btn_delete = document.createElement("button");
        btn_delete.style.color = "red";
        btn_delete.innerHTML='Delete';
        btn_delete.setAttribute('data',form[i].id);
        border_div.setAttribute('data',form[i].id);
        border_div.setAttribute('class','deleted_div'+form[i].id);
        btn_delete.onclick=function() {delete_show_modal(this)};
        border_div.appendChild(btn_delete);
    }
   for(i=index; i>1; i--)
   {
    // console.log(i);
        var p = document.getElementById('rem_div_'+i);
        p.remove();
   }
//    console.log(i);
   const element1 = document.getElementById("main-div").classList;
   if(i==1 && element1.contains("col-md-6"))
   {
        element1.remove("col-md-6");
        element1.add("col-md-12");
   }
}
function delete_show_modal(element){
    let show_data=element;
    show_data.dataset.toggle='modal';
    show_data.dataset.target='#exampleModal';
    let btn_id = element.getAttribute('data');
    var set_id=document.getElementById("yes");
    set_id.setAttribute('data',btn_id);
    // console.log(btn_id);
}
function delete_data(element){
    var del_id = element.getAttribute("data");
    var div_id = document.getElementsByClassName('deleted_div'+del_id);
    for (var i = div_id.length - 1; i >= 0; --i) {
        div_id[i].remove();
    }
}
function edit_show_modal(element){
    let edit_show_data=element;
    edit_show_data.dataset.toggle='modal';
    edit_show_data.dataset.target='#exampleModalEdit';
    let btn_id = element.getAttribute('data');
    var edit_set_id = document.getElementById("update");
    edit_set_id.setAttribute('data',btn_id);
    // console.log(btn_id);
    document.getElementById("date_edit").value = form[btn_id-1].date;
    document.getElementById("title_edit").value = form[btn_id-1].title;
    document.getElementById("notes_edit").value = form[btn_id-1].notes;    
}
function update_data(element){
    var edit_id = element.getAttribute("data");
    // console.log(edit_id);
    let formdata = new FormData(element);
    const date_arr1 = formdata.getAll('date');
    const title_arr1 = formdata.getAll('title');
    const notes_arr1 = formdata.getAll('notes');
    form[edit_id-1].date = date_arr1[0];
    form[edit_id-1].title = title_arr1[0];
    form[edit_id-1].notes = notes_arr1[0];
    // console.log(form);
    var replace_div = document.getElementById('disp'+edit_id);
    // console.log(replace_div);
    replace_div.innerHTML="ID : "+form[edit_id-1].id+"<br>"+"Date : "+form[edit_id-1].date+"<br>"
        +"Title : "+form[edit_id-1].title+"<br>"+"Notes : "+form[edit_id-1].notes+"<br>";    
}



// div=document.getElementById("display_data");
    // div.replaceChildren();
    // let table = document.createElement('table');
    // let thead = document.createElement('thead');
    // let tbody = document.createElement('tbody');
    // table.appendChild(thead);
    // table.appendChild(tbody);
    // div.appendChild(table);
    // let row_1 = document.createElement('tr');
    // let heading_1 = document.createElement('th');
    // heading_1.innerHTML = "Sr. No.";
    // let heading_2 = document.createElement('th');
    // heading_2.innerHTML = "Action";
    // let heading_3 = document.createElement('th');
    // heading_3.innerHTML = "Date";
    // let heading_4 = document.createElement('th');
    // heading_4.innerHTML = "Title";
    // let heading_5 = document.createElement('th');
    // heading_5.innerHTML = "Notes";
    // row_1.appendChild(heading_1);
    // row_1.appendChild(heading_2);
    // row_1.appendChild(heading_3);
    // row_1.appendChild(heading_4);
    // row_1.appendChild(heading_5);
    // thead.appendChild(row_1);

    // const x = document.forms["form1"];
    // let text = "";
    // let formIndex = 1;
    // row_2 = '';
    // for (let i = 0; i < x.length ;i++) {
    //     if(x.elements[i].value==undefined){
    //         let row = document.createElement('tr');
    //         row_2 = row;
            
    //         let row_2_data_1 = document.createElement('td');
    //         row_2_data_1.innerHTML = formIndex;
    //         row_2.appendChild(row_2_data_1);
    //         tbody.appendChild(row_2);
    //         formIndex++;
    //     }
    //     if(x.elements[i].value=='Submit'){
    //         break;
    //     }
    //     if(x.elements[i].value!=undefined){
    //         let row_2_data_2 = document.createElement('td');
    //         row_2_data_2.innerHTML = x.elements[i].value;
    //         row_2.appendChild(row_2_data_2);
    //         tbody.appendChild(row_2);
    //     }
    //     console.log(x.elements[i].value+4);
    //     if(x.elements[i].value==undefined)
    //     {
    //         let row_2_data_3 = document.createElement('td');
    //         row_2_data_3.innerHTML = "Edit"+"<br>"+"Delete";
    //         row_2.appendChild(row_2_data_3);
    //         tbody.appendChild(row_2);
    //     } 
    // }
// var div = document.createElement("div");
// div.style.width = "100px";
// div.style.height = "100px";
// div.style.background = "red";
// div.style.color = "white";
// div.innerHTML = "Hello";

// document.getElementById("main").appendChild(div);
// OR
// document.body.appendChild(div);

// var strText1 = document.getElementById("date").value;
//         var strText2 = document.getElementById("title").value;
//         var strText3 = document.getElementById("notes").value;
//         document.getElementById("p1").innerHTML = "Date : "+strText1;
//         document.getElementById("p2").innerHTML = "Title : "+strText2;
//         document.getElementById("p3").innerHTML = "Notes : "+strText3;



   
    
    
    //   return false;
    
    
    // for(var i=0; i<val.length; i++)
    // {
    //     var j = 1;
    //     console.log(val[i][j]);
    // }
    // let list_div = document.getElementById("list");
    // list_div.replaceChildren();
    
    // const x = document.forms["form1"];
    // let text = "";
    // let formIndex = 0;
    // for(let i=0;i<x.length;i++){

    //     if(x.elements[i].value==undefined){
    //         // console.log(i%);
    //         var border_div = document.createElement("div");
            
    //         var id = formIndex++;
    //         arr1.push(formIndex);
    //         border_div.style.width = "100%";
    //         border_div.style.border = "1px solid black";

    //         var display_div = document.createElement("div");
    //         display_div.setAttribute('class','dis_div'+formIndex);
    //         border_div.appendChild(display_div);
    //         list_div.appendChild(border_div);

    //         var btn_edit = document.createElement("button");
    //         btn_edit.style.color = "blue";
    //         btn_edit.innerHTML="Edit";
    //         border_div.setAttribute('data-id',formIndex);
    //         border_div.setAttribute('class','Edit_div'+formIndex);
    //         btn_edit.setAttribute('data',formIndex);
    //         btn_edit.onclick=function() {edit_show_modal(this)};
    //         border_div.appendChild(btn_edit);

    //         var btn_delete = document.createElement("button");
    //         btn_delete.style.color = "red";
    //         btn_delete.setAttribute('id','del'+formIndex);
    //         btn_delete.innerHTML='Delete';
    //         border_div.setAttribute('data-id',formIndex);
    //         border_div.setAttribute('class','deleted_div'+formIndex);
    //         btn_delete.setAttribute('data',formIndex);
    //         btn_delete.onclick=function() {show_modal(this)};
    //         border_div.appendChild(btn_delete);
            
    //         text = '';
    //         text+="Sr. No : "+formIndex+"<br>";
    //     }
    //     else if(x.elements[i].value=='Submit'){
    //         break;
    //     }
    //     else{
    //         // var text_div = document.createElement("div");
    //         // text_div.setAttribute('id',formIndex);
    //         // display_div.appendChild(text_div);
    //         // border_div.appendChild(display_div);
    //         // list_div.appendChild(border_div);
    //         text += x.elements[i].value+"<br>";
    //         arr1.push(x.elements[i].value);
    //         display_div.innerHTML = text;
    //     }
    // }
    
    // console.log(arr1);
 