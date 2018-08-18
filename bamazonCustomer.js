//require table
var Table = require('cli-table');
//require inquirer
var inquirer = require("inquirer");
//require mysql
var mysql = require("mysql");
//require colors
var colors = require("colors");
// console.log('hello'.green);
//configure sqlconnection
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});
//on connection
connection.connect(function(err) {
  if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//   afterConnection();
    displayProducts();
});
 
//create cli-table
var table = new Table({
    head: ['Product ID', 'Product Name', 'Department', 'Price', 'Stock']
//   
});
//global variables accessable to all functions
  var id;
  var numberOf;
  var total;
  var cost;
//   var dbId;
//   var dbName;
//   var dbDept;
//   var dbPrice;
  var dbQuantity;
// 
//query database 
function displayProducts () {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var dbId = res[i].item_id;
            var dbName = res[i].product_name;
            var dbDept = res[i].department_name;
            var dbPrice = res[i].price;
            dbQuantity = res[i].stock_quantity;
            //push res into cli-table
            table.push([dbId, dbName, dbDept, dbPrice, dbQuantity])
        };
        //display cli-table
        console.log(table.toString());
        //prompt user for input
        inquirer
  .prompt([
    {
        type: "input",
        name: "id",
        message: "Please enter the ID of the product you would like to purchase?"
    },
    {
        type: "input",
        name: "quantity",
        message: "Please enter the quanitity you would like to purchase?" 
    }
  ]).then(function(answer){
      //reassign variables depending on user response
      id = answer.id;
      numberOf = parseInt(answer.quantity);
      checkStock();
    // console.log(id);
    // console.log(numberOf);
    // console.log(id + numberOf);    
  })   
    })
    //end of display products
}


function checkStock () {
    if (numberOf > parseInt(dbQuantity)) {
            console.log("Your order exceeds current stock quantity");
            displayProducts();
        } else {
            connection.query("SELECT * FROM products WHERE item_id= ?", [id], function(err, res) {
                if (err) throw err;
                var resProduct = res[0];
                total = parseInt(resProduct.stock_quantity) - numberOf;
                cost = parseFloat(parseFloat(resProduct.price) * numberOf).toFixed(2);
                console.log("You have purchased " + 
                numberOf + 
                " " + 
                resProduct + 
                " for a total price of $" 
                + cost 
                + ".");
            })
        }
      connection.end();  
      //end of check stock
}

// function updateTable () {

// }


// function checkStock () {
//     connection.query("SELECT * FROM products WHERE id = ?", [id], function (err, res) {
//         if (err) throw err;
//         console.log(res);
//     })
    
// }

// 

        //if yes fufill order
            //update remaining quantity
            //show total cost of purchase
//move on to step two
