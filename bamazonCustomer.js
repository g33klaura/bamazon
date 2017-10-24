// JavaScript for Bamazon ~ Customer View

/*
Steps to complete:
[x] Connection to database
[x] 'bamazonCustomer.js' displays all items for sale
[] Use fancy tables to display
[] next, prompts user to enter the id of an item they wish to buy
[] second prompt asks how many of the item they wish to buy
[] show "added to cart" or "insufficient qty" message
[] if purchase is successful, 
	 [] the qty needs to be subtracted from the database
	 [] and total of purchase is displayed

*totally should've recreated the store from Oregon Trail. D'OH!!! 


This file writes the code for the actual node interface
User will be able to write 'node bamazonCustomer' and do the things required for the homework

*/


// REQUIREMENTS ========================================
// 

// const bamCRUD = require('./bamCRUD.js');

const Table = require('cli-table');
const colors = require('colors');
const inquirer = require('inquirer');
const mysql = require('mysql');

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
	displayProducts();
});

// VARIABLES & CONSTRUCTORS ============================
// 

// let table = new Table({
// 	head: ['TH 1 id', 'TH 2 product_name'],
// 	colWidths: [5, 60]
// });

// So... how to get the values to be read from the database....
// let query = connection.query ....
// but that's in 'bamCRUD.js'....
// table.push(
// 	['First value', 'Second value'],
// );
// console.log(table.toString());



// FUNCTIONS ===========================================
//

function displayProducts() {
	connection.query('SELECT * FROM products', function(error, results) {
		if (error) throw error;
		console.log(results);

		askCustomer();
	});
}

function askCustomer() {
	inquirer.prompt([
		// Inquirer prompt asking user to enter the id of the product they'd like to buy
		{
			type: 'input',
			name: 'itemsToBuy',
			message: 'Please enter the id of the item you wish to buy.'
		},
		// Second prompt asks how many units of the item they'd like to buy
		{
			type: 'input',
			name: 'qtyToBuy',
			message: 'How many of those would you like to buy?'
		}
	])
	.then(function(inquirerResponse) {
		// Test response  ~WORKS
		console.log('You selected ' + inquirerResponse.qtyToBuy + ' of item number: ' + inquirerResponse.itemsToBuy);

		makeSale();
	});
}

function makeSale() {
	// body...
}

// Put this at end of last function to run
// connection.end();



// MAIN PROCESS ========================================
// 
