const db = require("./connection");
const inquirer = require("inquirer");

async function viewAllRoles() {
    try {
        const role = db.query("SELECT * FROM role");
        return role;
    } catch (err) {
        console.log(err);
    }
}

async function addRole() {
    try {
        const departments = await viewAllDepartments();
        const { title, salary, department_id } = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the title of the new role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the new role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "What is the department of the new role?",
                choices: departments.map((department) => {
                    return {
                        value: department.id,
                        name: department.name
                    }
                })
            }
        ])
        await db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`)
        const newRole = await viewAllRoles();
        return newRole
    } catch (err) {
        console.log(err)
    }
}

async function deleteRole() {
    try {
        const allRoles = await viewAllRoles();
        const { id } = await inquirer.prompt([
            {
                type: 'list',
                message: 'Which role would you like to delete?',
                name: 'id',
                choices: allRoles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
            }
        ])
        await db.query(`DELETE FROM role WHERE id = ${id}`)
        return await viewAllRoles();
    } catch (err){
        console.log(err)
    }
}

module.exports = { viewAllRoles, addRole, deleteRole }