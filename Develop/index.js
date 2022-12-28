const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartment, deleteDepartment } = require("./db/departments");
const { viewAllEmployees, addEmployee, updateEmployeeRole, deleteEmployee } = require("./db/employees");
const { viewAllRoles, addRole, deleteRole } = require("./db/roles");

const start = async () => {
    console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt ([
        {
            type : 'list',
            name : 'choice',
            message : 'What would you like to do?',
            choices : [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            "Delete an Employee",
            "Delete a Department",
            "Delete a Role",
            "Exit",
            ]
        }
    ])

    switch (choice) {
        case 'View all Departments':
            const departments = await viewAllDepartments();
            console.table(departments);
            break;
        case 'View all Employees':
            const employees = await viewAllEmployees();
            console.table(employees);
            break;
        case 'View all Roles':
            const roles = await viewAllRoles();
            console.table(roles);
            break;
        case 'Add an Employee':
            const newEmployee = await addEmployee();
            console.table(newEmployee);
            break;
        case 'Update an Employee Role':
            const updateEmployee = await updateEmployeeRole();
            console.table(updateEmployee)
            break;
        case 'Delete an Employee':
            const deletedEmployee = await deleteEmployee();
            console.table(deletedEmployee);
            break;
        case 'Add a Department':
            const newDepartment = await addDepartment();
            console.table(newDepartment);
            break;
        case 'Add a Role':
            const addedRole = await addRole();
            console.table(addedRole)
            break;
        case 'Delete a Department':
            const deletedDepartment = await deleteDepartment();
            console.table(deletedDepartment)
            break;
        case 'Delete a Role':
            const deletedRole = await deleteRole();
            console.table(deletedRole)
            break;
    }
}

start();
