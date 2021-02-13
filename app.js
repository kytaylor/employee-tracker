// MAKE SURE NOT TO COMMIT WITH PASSWORD ENTERED

// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connection Properties
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_DB"
});

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

            case "Add new department":
                newDepartment()
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

function employeeSummary() {
    let query = "SELECT e.id AS id, CONCAT(e.first_name, ' ', e.last_name) AS name, role.title AS title, role.salary AS salary, department.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY id ASC";

    connection.query(query, function(err, res) {
        if (err) {
            throw err
        };
        console.log("Summary of employees:")
        console.table(res)

        // initMenu();
    });
}

function roleSummary() {
    
}

function departmentSummary() {
    
}

function newEmployee() {
    
}

function newRole() {
    
}

function newDepartment() {
    
}

function editEmployee() {
    
}

function editRole() {
    
}

function editDepartment() {
    
}