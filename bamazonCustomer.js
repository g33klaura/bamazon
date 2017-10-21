// REQUIREMENTS ========================================
// 

// const mysql = require('mysql');
const Table = require('cli-table');

const bamCRUD = require('./bamCRUD.js');




// VARIABLES & CONSTRUCTORS ============================
// 

let table = new Table({
	head: ['TH 1 id', 'TH 2 product_name'],
	colWidths: [5, 60]
});

// So... how to get the values to be read from the database....
// let query = connection.query ....
// but that's in 'bamCRUD.js'....
// table.push(
// 	['First value', 'Second value'],
// );
console.log(table.toString());



// FUNCTIONS ===========================================
//



// MAIN PROCESS ========================================
// 
