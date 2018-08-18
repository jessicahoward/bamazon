// ### Challenge #2: Manager View (Next Level)

// * Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:

//     * View Products for Sale
    
//     * View Low Inventory
    
//     * Add to Inventory
    
//     * Add New Product

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

// - - -

// * If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy! Otherwise continue to the next and final challenge.

// - - -
//require table
var Table = require('cli-table');
//require inquirer
var inquirer = require("inquirer");
//require colors
var colors = require("colors")
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
    'Department', 
    'Price', 
    'Stock']  
});

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

            switch(answer) {
                case "View Products for Sale":
                    viewProd();
                    break;
                case "View Low Inventory":
                    viewLow();
                    break;
                case "Add to Inventory":
                    viewLow();
                    break;
                case "Add New Product":
                    viewLow();
                    break;

                default:
                    connection.end();
            }
            
        })
//end of prompt manager
}

// function viewProd () {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var dbId = res[i].item_id;
            var dbName = res[i].product_name;
            var dbPrice = res[i].price;
            dbQuantity = res[i].stock_quantity;
            //push res into cli-table
            table.push([dbId, dbName, dbPrice, dbQuantity])
        };
//display cli-table
        console.log(table.toString());
    })
// //end of viewProd
// }

// function viewLow () {
// //end of viewLow
// }

// function addStock () {
// //end of addStock
// }

// function addProd () {
// //end of addProd
// }

// //create cli-table
// var table = new Table({
//     head: ['Product ID', 
//     'Product Name', 
//     'Department', 
//     'Price', 
//     'Stock']  
// });
// //global variables accessable to all functions
//   var id;
//   var numberOf;
//   var total;
//   var cost;
//   var dbQuantity;
// //query database 
// function displayProducts () {
//     connection.query("SELECT * FROM products", function(err, res) {
//         if (err) throw err;
//         for (var i = 0; i < res.length; i++) {
//             var dbId = res[i].item_id;
//             var dbName = res[i].product_name;
//             var dbDept = res[i].department_name;
//             var dbPrice = res[i].price;
//             dbQuantity = res[i].stock_quantity;
//             //push res into cli-table
//             table.push([dbId, dbName, dbDept, dbPrice, dbQuantity])
//         };
// //display cli-table
//         console.log(table.toString());
// //prompt user for input
//         inquirer
//   .prompt([
//     {
//         type: "input",
//         name: "id",
//         message: "Please enter the ID of the product you would like to purchase?"
//     },
//     {
//         type: "input",
//         name: "quantity",
//         message: "Please enter the quanitity you would like to purchase?" 
//     }
//   ]).then(function(answer){
// //reassign variables depending on user response
//       id = answer.id;
//       numberOf = parseInt(answer.quantity);
//       checkStock();    
//   })   
//     })
// //end of display products
// }


// function checkStock () {
// //do you have the stock?
//     if (numberOf > parseInt(dbQuantity)) {
//             console.log("Your order exceeds current stock quantity");
//             connection.end();
// //if yes, complete the order
//         } else {
//             connection.query("SELECT * FROM products WHERE item_id= ?", [id], function(err, res) {
//                 if (err) throw err;
//                 var resProduct = res[0];
//                 total = parseInt(resProduct.stock_quantity) - numberOf;
//                 cost = parseFloat(parseFloat(resProduct.price) * numberOf).toFixed(2);
//                 console.log("You have purchased " + 
//                 numberOf + 
//                 " " + 
//                 resProduct.product_name + 
//                 " for a total price of $" 
//                 + cost 
//                 + ".");
//                 updateTable();
//             })
//         }
// //end of check stock
// }

// // update remaining quantity on db
// function updateTable () {
//     connection.query("UPDATE products SET ? WHERE ?", 
//     [
//         {
//           stock_quantity: total  
//         },
//         {
//             item_id: id
//         }
//     ], function (err, res) {
//         if (err) throw err;
//       });
//     connection.end(); 
// //end of update table 
// }
// //move on to step two
