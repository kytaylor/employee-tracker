// MAKE SURE NOT TO COMMIT WITH PASSWORD ENTERED

// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connection Properties
const connection = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_DB"
}

// Database Connection
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    initMenu();
});

function initMenu() {
    inquirer.prompt([{
        name: "menu",
        type: "list",
        message: "What would you like to do?",
        choices :[
            "View all employees",
            "View employees by role",
            "View employees by department",
            "Add new employee",
            "Add new role",
            "Add new department",
            "Edit employee",
            "Edit role",
            "Edit department"
        ]
    }]).then(function(res) {
        switch (res.menu) {
            case "View all employees":
                employeeSummary();
                break;
            
            case "View employees by role":
                roleSummary();
                break;
                
            case "View employees by department":
                departmentSummary();
                break;
            
            case "Add new employee":
                newEmployee();
                break;

            case "Add new role":
                newRole()
                break;
                
            case "Edit employee":
                editEmployee();
                break;
                    
            case "Edit role":
                editRole();
                break;
                
            case "Edit department":
                editDepartment();
                break;
        }
    })
}