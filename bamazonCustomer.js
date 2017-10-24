// JavaScript for Bamazon ~ Customer View

/*
Steps to complete:
[] Connection to database
[] 'bamazonCustomer.js' displays all items for sale


This file writes the code for the actual node interface
User will be able to write 'node bamazonCustomer' and do the things required for the homework

*/


// REQUIREMENTS ========================================
// 

const mysql = require('mysql');
const table = require('cli-table');

// Moved connections from CRUD to this file till I know if I even need the other file....
// const bamCRUD = require('./bamCRUD.js');

const connection = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon'
});

connection.connect(function(error) {
	if (error) throw error;
	console.log('connected as id ' + connection.threadId + '\n');

	// createProduct(); <~from iceCreamCRUD activity
});



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
