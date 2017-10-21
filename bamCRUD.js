// JavaScript for Bamazon

/*
Steps to complete:
[] Connection to database
[] 'bamazonCustomer.js' displays all items for sale

Q: WHICH FILE LINKS TO WHICH???
If bamazonCustomer runs, THAT needs the 'cli-table' req
*/


// REQUIREMENTS ========================================
// 

const mysql = require('mysql');
const table = require('cli-table');



// VARIABLES & CONSTRUCTORS ============================
// 

const connection = mysql.createConnection({
	host: 127.0.0.1,
	port: 3306,
	user: 'root',
	password: ''.
	database: 'bamazon'
});
connection.connect(function(error) {
	if (error) throw error;
	console.log('connected as id ' + connection.threadId + '\n');

	// createProduct(); <~from iceCreamCRUD activity
});





// FUNCTIONS ===========================================
//



// MAIN PROCESS ========================================
// 
