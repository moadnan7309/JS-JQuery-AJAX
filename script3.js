var index=1;
var x = 1;
function add_row()
{
    index++;
    x++;
    const html = `<div class="row" id="row_id`+index+`">
                        <div class="col-md-1">
                            `+x+`
                        </div>
                        <div class="col-md-3">
                            <div class="form-group row">
                                <label for="product" class="col-sm-3 col-form-label">Product:</label>
                                <div class="col-sm-9">
                                    <input type="text" name="product[]" placeholder="Product"  class="form-control" id="product">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group row">
                                <label for="quantity" class="col-sm-3 col-form-label">Quantity:</label>
                                <div class="col-sm-9">
                                    <input type="text" name="quantity[]" placeholder="Quantity"  class="form-control" id="quantity">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3" >
                            <div class="form-group row">
                                <label for="price" class="col-sm-3 col-form-label">price:</label>
                                <div class="col-sm-9">
                                    <input type="text" name="price[]" placeholder="Price"  class="form-control" id="price">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <input type="button" onclick="remove_row(row_id`+index+`)" value="Remove Row" class="btn btn-danger">
                        </div>
                    </div>`;
document.getElementById("add_row").innerHTML += html;
}
function remove_row(element)
{
    element.remove();
    const count = document.getElementById("add_row").children;
    let arr = Object.entries(count);
    arr.forEach((val) => {
        const [key, value] = val;
        let val_Id = Number(key)+1;
        value.firstChild.nextSibling.innerHTML = val_Id;
        x=val_Id;
    });
}