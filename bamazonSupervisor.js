// 4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |

// 5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

// 6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

//    * Hint: You may need to look into aliases in MySQL.

//    * Hint: You may need to look into GROUP BYs.

//    * Hint: You may need to look into JOINS.

//    * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)

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
    console.log("Welcome, Supervisor".red)
    promptSuper();
});

var table = new Table({
    head: ['Department ID', 
    'Department Name',  
    'Overhead Costs']  
});
//global variables
var deptId;
var deptName;
var deptCost;
// deptSales;
// 3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

//    * View Product Sales by Department
function promptSuper () {
    inquirer.
        prompt([
            {
                type: "list",
                message: "Please select a task.",
                choices: ["View Product Sales by Department",
                    "Create New Department"],
                name: "tasks"    
            }
        ]).then(function(answer){
            switch(answer.tasks) {
                case "View Product Sales by Department":
                    console.log("Department Sales Information".green);
                    viewSales();
                    break;

                case "Create New Department":
                    console.log("Add New Departments".green);
                    addDept();
                    break;

                default:
                    console.log("Goodbye, Supervisor".red);
                    connection.end();
            }
            
        })
//end of prompt supervisor
}

function viewSales () {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            deptId = res[i].department_id;
            deptName = res[i].department_name;
            deptCost = res[i].overhead_cost;
            // deptSales = res[i].stock_quantity;
            //push res into cli-table
            table.push([deptId, deptName, deptCost])
        };
//display cli-table
        console.log(table.toString());
        connection.end();
    });
    
//end of viewSales
}

function addDept () {
    inquirer.
        prompt([
            {
                type: "input",
                message: "What is the name of the Department you are adding?",
                name: "dept"    
            },
            {
                type: "input",
                message: "What is the Overhead Cost for the Department you are adding?",
                name: "cost"    
            }
        ]).then(function(answer){
            console.log(answer.dept);
            console.log(answer.cost);
            connection.query( "INSERT INTO departments SET ?",
            {
              department_name: answer.dept,
              overhead_cost: parseFloat(answer.cost).toFixed(2)
            }, function (err, res) {
        if (err) throw err;
        console.log("New Department has been added!".blue);
        
      });
        connection.end();
        })
//end of addDept
}
