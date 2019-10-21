var express = require("express"),
    morgan = require("morgan"),
    path = require("path"),
    bodyParser = require("body-parser"),
    app = express();


app.use(morgan('combined'));
app.use(morgan("dev", {}));
app.use(bodyParser.json());

//app.use(morgan("dev", {}));
var cart = [];

app.post("/add", function (req, res, next) {
    var obj = req.body;
    console.log("add ");
    console.log("Attempting to add to cart: " + JSON.stringify(req.body));
    var max = 0;
    var ind = 0;
    if (cart["" + obj.custId] === undefined)
        cart["" + obj.custId] = [];
    var c = cart["" + obj.custId];
    for (ind = 0; ind < c.length; ind++)
        if (max < c[ind].cartid)
            max = c[ind].cartid;
    var cartid = max + 1;
    var data = {
        "cartid": cartid,
        "productID": obj.productID,
        "name": obj.name,
        "price": obj.price,
        "image": obj.image,
        "quantity": obj.quantity
    };

    //PART 4 A: Combine items in card.
    console.log(JSON.stringify(data));
    var duplicateItem = false; //Boolean to decide if the item should be added or updated.
    //Check for duplicate
    //console.log("c is "+ JSON.stringify(c))
    c.forEach(item => {
        //console.log("item is " + JSON.stringify(item))
        if(item.productID == obj.productID){// If there is a duplicate just edit info
            duplicateItem = true;
            console.log("Duplicate Item detected!"); 
            item.quantity = parseInt(item.quantity) + parseInt(obj.quantity)
            item.price = item.price + obj.price;          
        }
    });
    //If item has no duplicate put it in as a new item
    if(duplicateItem == false){
        c.push(data);
    }
    console.log(JSON.stringify(c));
    res.status(201);
    res.send("");
});

//TODO: 
app.delete("/cart/:custId/items/:id", function (req, res, next) {
/*    var obj = req.body;
    console.log("DELETE ");
    console.log("Attempting to remove from cart: " + JSON.stringify(req.body));
    var max = 0;
    var ind = 0;
    if (cart["" + obj.custId] === undefined)
        cart["" + obj.custId] = [];
    var c = cart["" + obj.custId];
    for (ind = 0; ind < c.length; ind++)
        if (max < c[ind].cartid)
            max = c[ind].cartid;
    var cartid = max + 1;
    var data = {
        "cartid": cartid,
        "productID": obj.productID,
        "name": obj.name,
        "price": obj.price,
        "image": obj.image,
        "quantity": obj.quantity
    };

    //PART 4: Combine items in card.
    console.log(JSON.stringify(data));
    //console.log("c is "+ JSON.stringify(c))
    c.forEach(item, index => {
        //console.log("item is " + JSON.stringify(item))
        if(item.productID == obj.productID){// If there is a duplicate just edit info
            if(item.quantity > 1){
                item.quantity = item.quantity - 1;
                item.price = item.price - obj.price;
            }else if(item.quantity == 1){
                c.splice(index,1);
            }

        }
    });
    console.log(JSON.stringify(c));
    res.status(201);
    res.send("");*/
    var body = '';
    console.log("Delete item from cart: for custId " + req.url + ' ' +
        req.params.id.toString());
    console.log("delete");
    
    res.send(' ');
});


app.get("/cart/:custId/items", function (req, res, next) {
    var custId = req.params.custId;
    console.log("getCart" + custId);
    console.log('custID ' + custId);
    console.log(JSON.stringify(cart["" + custId], null, 2));
    res.send(JSON.stringify(cart["" + custId]));
    console.log("cart sent");
});


var server = app.listen(process.env.PORT || 3003, function () {
    var port = server.address().port;
    console.log("App now running in %s mode on port %d", app.get("env"), port);
});