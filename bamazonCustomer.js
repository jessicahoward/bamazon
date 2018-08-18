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

connection.connect(function(err) {
  if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//   afterConnection();
    displayProducts();
});

// function afterConnection() {
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// }
 
// instantiate
var table = new Table({
    head: ['Product ID', 'Product Name', 'Department', 'Price', 'Stock']
//   
});
  
// 
//display table of products usining table and my sql 
function displayProducts () {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        };
        console.log(table.toString());
        inquirer
  .prompt([
    {
        type: "input",
        name: "id",
        message: "Please enter the ID of the product you would like to purchase: "
    },
    {
        type: "input",
        name: "quantity",
        message: "Please enter the quanitity you would like to purchase: " 
    }
  ]).then(function(answer){
    console.log(answer.id);
    console.log(answer.quantity)
  })


       connection.end(); 
    })
}

// 
//prompt user requesting id of product they would like to buy
//prompt user asking how many of product
    //do you have enogh to fil the order?
        //if not display message "Insufficient quantity!", block the order.
        //if yes fufill order
            //update remaining quantity
            //show total cost of purchase
//move on to step two
