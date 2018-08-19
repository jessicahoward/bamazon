//require table
var Table = require('cli-table');
//require inquirer
var inquirer = require("inquirer");
//require colors
var colors = require("colors");
//require mysql
var mysql = require("mysql");
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
    console.log("Welcome, Manager".red)
    promptManager();
});

var table = new Table({
    head: ['Product ID', 
    'Product Name',  
    'Price', 
    'Stock']  
});
//global variables
var dbId;
var dbName;
var dbPrice;
var dbQuantity;
var increase;
var stock;
var newInv;

function promptManager () {
    inquirer.
        prompt([
            {
                type: "list",
                message: "Please select a task.",
                choices: ["View Products for Sale",
                    "View Low Inventory", "Add to Inventory",
                    "Add New Product"],
                name: "tasks"    
            }
        ]).then(function(answer){
            switch(answer.tasks) {
                case "View Products for Sale":
                    console.log("All Products for Sale".green);
                    viewProd();
                    break;

                case "View Low Inventory":
                    console.log("All Inventory Under 5".green);
                    viewLow();
                    break;

                case "Add to Inventory":
                    console.log("Add to Item Inventory".green);
                    addStock();
                    break;

                case "Add New Product":
                    console.log("Add New Products".green);
                    addProd();
                    break;

                default:
                    console.log("Goodbye, Manager".red);
                    connection.end();
            }
            
        })
//end of prompt manager
}

function viewProd () {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            dbId = res[i].item_id;
            dbName = res[i].product_name;
            dbPrice = res[i].price;
            dbQuantity = res[i].stock_quantity;
            //push res into cli-table
            table.push([dbId, dbName, dbPrice, dbQuantity])
        };
//display cli-table
        console.log(table.toString());
        connection.end();
    })
//end of viewProd
}

function viewLow () {
    connection.query("SELECT * FROM products WHERE stock_quantity < 6", function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            dbId = res[i].item_id;
            dbName = res[i].product_name;
            dbPrice = res[i].price;
            dbQuantity = res[i].stock_quantity;
            //push res into cli-table
            table.push([dbId, dbName, dbPrice, dbQuantity])
        };
//display cli-table
        console.log(table.toString());
        connection.end();

    })
//end of viewLow
}

function addStock () {
    inquirer.
        prompt([
            {
                type: "input",
                message: "Pease enter the ID for the item you would like to add inventory to.",
                name: "id"    
            },
            {
                type: "input",
                message: "How many would you like to add to the inventory?",
                name: "increase"    
            }
        ]).then(function(answer){
            increase = parseInt(answer.increase);
            connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [answer.id], function(err, res){
                if (err) throw err;
                stock = parseInt(res[0].stock_quantity);
                newInv = parseInt(stock + increase);
                         connection.query("UPDATE products SET ? WHERE ?", 
    [
        {
          stock_quantity: newInv  
        },
        {
            item_id: answer.id
        }
    ], function (err, res) {
        if (err) throw err;
      });
      connection.end();
            })
            

        })
        
// //end of addStock
}

function addProd () {
    inquirer.
        prompt([
            {
                type: "input",
                message: "What is the Department Name for the item you are adding?",
                name: "dept"    
            },
            {
                type: "input",
                message: "What is the Product Name for the item you are adding?",
                name: "name"    
            },
            {
                type: "input",
                message: "What is the Price for the item you are adding?",
                name: "price"
            },
            {
                type: "input",
                message: "How many would you like to add to stock?",
                name: "quantity"
            }
        ]).then(function(answer){
            console.log(answer.dept);
            console.log(answer.name);
            console.log(answer.price);
            console.log(answer.quantity);
            connection.query( "INSERT INTO products SET ?",
            {
              product_name: answer.name,
              department_name: answer.dept,
              price: parseFloat(answer.price).toFixed(2),
              stock_quantity: answer.quantity
            }, function (err, res) {
        if (err) throw err;
        console.log("New Product has been added!".blue);
        
      });
        connection.end();
        })
//end of addProd
}

