import { query } from './client';

//^ //////////////////////////////////////////
//^ Staff Queries
//^ //////////////////////////////////////////

export const fetchEmployees = async () => {
    try {
        const result = await query("SELECT * FROM STAFF ORDER BY idEmployee ASC"); // Adjust query as needed
        console.log(result.rows);
        return result.rows; // Ensure rows are returned
    } catch (error) {
        console.error("Database query error:", error);
        throw error; // Re-throw error to be caught in the API handler
    }
};

export const addEmployee = async (employee: {
    firstnameemployee: string;
    lastnameemployee: string;
    datebirth: string;
    roleemployee: string;
    wageemployee: number;
    statusemployee: string;
}) => {
    try {
        // Generate the new ID by finding the maximum current ID in the database
        const maxIdResult = await query(`SELECT MAX(idEmployee) AS max_id FROM STAFF`);
        const maxId = maxIdResult.rows[0]?.max_id || 0; // Default to 0 if no rows exist

        // Generate the new employee ID
        const newId = maxId + 1;

        const result = await query(
            `INSERT INTO STAFF (idEmployee, firstNameEmployee, lastNameEmployee, dateBirth, roleEmployee, wageEmployee, statusEmployee)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                newId,
                employee.firstnameemployee,
                employee.lastnameemployee,
                employee.datebirth,
                employee.roleemployee,
                employee.wageemployee,
                employee.statusemployee,
            ]
        );

        return result.rows[0]; // Return the inserted employee record
    } catch (error) {
        console.error("Database insertion error:", error);
        throw error; // Re-throw error to be caught in the API handler
    }
};

export const updateEmployeeStatus = async (id: string, status: string) => {
    try {
        const result = await query(
            `UPDATE STAFF SET statusEmployee = $1 WHERE idEmployee = $2 RETURNING *`,
            [status, id]
        );

        return result.rows[0]; // Return the updated employee record
    } catch (error) {
        console.error("Database update error:", error);
        throw error;
    }
};