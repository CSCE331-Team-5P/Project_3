import { query } from './client';

//^ Example queries
export async function getAllUsers() {
    const result = await query('SELECT * FROM users');
    return result.rows;
}

//^ Example queries with parameters
export async function getUserById(id: number) {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

//^ //////////////////////////////////////////
//^ Home Page Queries
//^ //////////////////////////////////////////

//^ Get Monthly Revenue
