var index = 1;

function addform() {
    index++;
    const html = `<fieldset class="border p-2" id="div_` + index + `">
    <div class="form-group row">
    <label for="file" class="col-sm-3 col-form-label">Choose File :</label>
    <div class="col-sm-9">
        <input type="file" name="file[]"  class="form-control" id="file">
    </div>
</fieldset>`;
    document.getElementById("add_file").innerHTML += html;
}

function myFile(dev) {
    let fd = new FormData(dev);
    let val = [...fd.entries()];
    const file_arr = fd.getAll('file[]');
    form = [];
    file_arr.forEach((values, index) => {
        form.push({
            id: index + 1,
            file: file_arr[index]
        })
    });
    let main_div = document.getElementById("list_display");
    main_div.replaceChildren();
    for (let i = 0; i < form.length; i++) {
        var border_div = document.createElement("div");
        border_div.style.width = "100%";
        border_div.style.border = "1px solid black";
        border_div.setAttribute('id', 'border_id' + form[i].id);
        border_div.innerHTML = "ID : " + form[i].id + "<br>" + "File : " + form[i].file.name + "<br>" + "Image : <br>";
        const img = document.createElement("img");
        img.id = 'img_id' + form[i].id;
        img.src = form[i].file.name;
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.display = 'block';

        // const a = document.createElement("a");
        // a.innerHTML = '<button class="btn" style="color:blue;"><i class="fa fa-download"></i> Download</button>'
        // border_div.appendChild(img);
        // border_div.appendChild(a); 
        // main_div.appendChild(border_div);

        const btn = document.createElement("button");
        btn.innerHTML = "Download";
        btn.setAttribute('id', 'btn_id' + form[i].id);
        btn.setAttribute('class', "btn");
        btn.style.color = "blue";
        border_div.appendChild(img);
        border_div.appendChild(btn);
        main_div.appendChild(border_div);
        btn.onclick = function() { download_btn(btn, img) };
        // btn.onclick=function() {download_btn(this)};
        // btn.onclick=function() {download(form[i].file.name)};
        // console.log(btn);
        // console.log(img);
    }
}

function download_btn(btn, img) {
    const btn_id = btn.getAttribute("id");
    const img_id = img.getAttribute("id");
    // console.log(btn_id);
    // console.log(img_id);
    document.getElementById(btn_id).addEventListener("click", function() {
        var img = document.getElementById(img_id);
        // console.log(img);
        var filename = "1.png";
        download(filename, img);
    }, false);
}

function download(file, img) {
    var element = document.createElement('a');
    element.setAttribute('href', '');
    element.setAttribute('download', file);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}