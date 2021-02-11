-- Department seeds --
INSERT INTO department (name)
VALUE ("Engineering");

INSERT INTO department (name)
VALUE ("Sales");

INSERT INTO department (name)
VALUE ("Human Resources");

-- Role seeds --
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 55000, 1);

INSERT INTO role (title, salary, department_id)
VALUE ("Project Manager", 64000, 2);

INSERT INTO role (title, salary, department_id)
VALUE ("HR Director", 90000, 3;

-- Employee seeds --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Casey", "Drake", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Reagan", "Baxter", 6, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Patrick", "Bailey", 4, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Angus", "Dewey", 1, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Matthew", "Miller", 7, 2);