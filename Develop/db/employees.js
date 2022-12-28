const db = require("./connection");

async function viewAllEmployees() {
    try {
        const employee = 
            await db.promise().query('SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id');
        return employee[0];
    } catch (err) {
        console.log(err)
    }
}


module.exports = { viewAllEmployees }