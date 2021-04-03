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
  password: "Serperi0r!5468",
  database: "employees_DB",
});

// Database Connection
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  initMenu();
});

function initMenu() {
  inquirer
    .prompt([
      {
        name: "menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all roles",
          "View all departments",
          "Add new employee",
          "Add new role",
          "Add new department",
          "Edit employee role",
        ],
      },
    ])
    .then(function (res) {
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
          newRole();
          break;

        case "Add new department":
          newDepartment();
          break;

        case "Edit employee role":
          editRole();
          break;
      }
    });
}

function employeeSummary() {
  let query =
    "SELECT e.id AS id, CONCAT(e.first_name, ' ', e.last_name) AS name, role.title AS title, role.salary AS salary, department.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY id ASC";

  connection.query(query, function (err, res) {
    if (err) {
      throw err;
    }
    console.log("Summary of employees:");
    console.table(res);

    initMenu();
  });
}

function roleSummary() {
  let query =
    "SELECT role.title AS title, role.id AS id, role.salary AS salary, role.department_id AS department_id FROM role ORDER BY id";

  connection.query(query, function (err, res) {
    if (err) {
      throw err;
    }
    console.log("Summary of roles:");
    console.table(res);

    initMenu();
  });
}

function departmentSummary() {
  let query =
    "SELECT department.name AS department_name, department.id AS id FROM department ORDER BY id";

  connection.query(query, function (err, res) {
    if (err) {
      throw err;
    }
    console.log("Summary of departments:");
    console.table(res);

    initMenu();
  });
}

function newEmployee() {
  let roleArr = [];
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });

  let managerArr = [];
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managerArr.push(res[i].first_name);
      }
    }
  );

  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter employee's first name",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter employee's last name",
      },
      {
        name: "role",
        type: "list",
        choices: roleArr,
      },
      {
        name: "manager",
        type: "list",
        choices: managerArr,
      },
    ])
    .then(function (res) {
      let newEmployeeRoleId = roleArr.indexOf(res.role) + 1;
      let newEmployeeManagerId = managerArr.indexOf(res.manager) + 1;

      connection.query("INSERT INTO employee SET ?", {
        first_name: res.firstname,
        last_name: res.lastname,
        role_id: newEmployeeRoleId,
        manager_id: newEmployeeManagerId,
      });
      console.table(res);
      initMenu();
    });
}

function newRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter role title",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter role salary",
      },
      {
        name: "department_id",
        type: "input",
        message: "Enter department id",
      },
    ])
    .then(function (res) {
      connection.query("INSERT INTO role SET ?", {
        title: res.title,
        salary: res.salary,
        department_id: res.department_id,
      });
      console.table(res);
      initMenu();
    });
}

function newDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter department name",
      },
    ])
    .then(function (res) {
      connection.query("INSERT INTO department SET ?", {
        name: res.name,
      });
      console.table(res);
      initMenu();
    });
}

function editRole() {
  let employeeArr = [];
  let roleArr = [];
  function employeeName() {
    connection.query(
      "SELECT employee.last_name FROM employee",
      function (err, res) {
        // console.log("potato salad", res)
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          employeeArr.push(res[i].last_name);
          // console.log(employeeArr)
        }
        employeeRole();
      }
    );
    console.log(employeeArr);
    // return employeeArr;
  }

  function employeeRole() {
    connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        roleArr.push(res[i].title);
      }
      prompt();
    });
    // return roleArr;
  }

  function prompt() {
    inquirer
      .prompt([
        {
          name: "name",
          type: "list",
          message: "Select employee's last name",
          choices: employeeArr,
        },
        {
          name: "role",
          type: "list",
          message: "Select employee's new role",
          choices: roleArr,
        },
      ])
      .then(function (res) {
        //   if (err) throw err;
        let newEmployeeRoleId = roleArr.indexOf(res.role) + 1;
        console.log(res);
        connection.query("UPDATE employee SET WHERE ?", {
          last_name: res.name,
          role_id: newEmployeeRoleId,
        }),
          console.table(res);
            initMenu();
        console.log("Spoon 3");
      });
  }
  employeeName();
}