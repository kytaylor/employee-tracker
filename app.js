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
            "View all roles",
            "View all departments",
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
            
            case "View all roles":
                roleSummary();
                break;
                
            case "View all departments":
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

        initMenu();
    });
}

function roleSummary() {
    let query = "SELECT role.title AS title, role.id AS id, role.salary AS salary, role.department_id AS department_id FROM role ORDER BY id";

    connection.query(query, function(err, res) {
        if (err) {
            throw err
        };
        console.log("Summary of roles:")
        console.table(res)

        initMenu();
    });
}

function departmentSummary() {
    let query = "SELECT department.name AS department_name, department.id AS id FROM department ORDER BY id";

    connection.query(query, function(err, res) {
        if (err) {
            throw err
        };
        console.log("Summary of departments:")
        console.table(res)

        initMenu();
    });
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