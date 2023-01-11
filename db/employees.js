const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllRoles } = require("./roles");

async function viewAllEmployees() {
    try {
        const employee = 
            await db.query('SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id');
        return employee;
    } catch (err) {
        console.log(err)
    }
}

async function addEmployee() {
    try{
        const roles = await viewAllRoles();
        const employees = await viewAllEmployees();
        const { firstName, lastName, role, manager } = await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: roles.map((role) => {
                    return {
                        value: role.id,
                        name: role.title
                    };
                }),
            },
            {
                type: "list",
                name: "manager",
                message: "Who is this employee's manager?",
                choices: [
                    ...employees.map((employee) => {
                        return {
                            value: employee.id,
                            name: `${employee.firstName} ${employee.lastName}`
                        };
                    }),
                    {
                        value: null,
                        name: "None"
                    }
                ]
            }
        ])
        await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${role}, ${manager})`);
        const newEmployees = await viewAllEmployees();
        return newEmployees;
    } catch (err) {
        console.log(err)
    }
}


async function updateEmployeeRole() {
    try {
        const currentEmployees = await viewAllEmployees();
        const employeeRoles = await viewAllRoles();
        const { employee, newRole } = await inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee's role would you like to update?",
                choices: currentEmployees.map((employee) => {
                    return {
                        name: `${employee.first_name}, ${employee.last_name}`,
                        value: employee.id
                    };
                }),
            },
            {
                type: "list",
                name: "newRole",
                message: "What is the employee's new role?",
                choices: employeeRoles.map ((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    };
                })
            }
        ]);
        await db.query(`UPDATE employee SET role_id = ${newRole} WHERE id = ${employee}`);
        const updatedEmployeeRole = await viewAllEmployees();
        return await updatedEmployeeRole;
    } catch (err){
        console.log(err)
    }
}

async function deleteEmployee() {
    try {
        const currentEmployees = await viewAllEmployees();
        const { id } = await inquirer.prompt([
            {
                type: "list",
                message: "Which employee would you like to delete?",
                name: "id",
                choices: currentEmployees.map((employee) => {
                    return {
                        name: `${employee.first_name}, ${employee.last_name}`,
                        value: employee.id
                    }
                })
            }
        ])
        await db.query(`DELETE FROM employee WHERE id = ${id}`)
        const updatedEmployees = await viewAllEmployees();
        return await updatedEmployees;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole, deleteEmployee }