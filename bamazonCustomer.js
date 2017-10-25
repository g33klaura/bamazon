// JavaScript for Bamazon ~ Customer View

/*
Steps to complete:
[x] Connection to database
[x] 'bamazonCustomer.js' displays all items for sale
[] Use fancy tables to display
[x] next, prompts user to enter the id of an item they wish to buy
[x] second prompt asks how many of the item they wish to buy
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
const colors = require('colors/safe');
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

// Customer view table displays ID, Product Name, Dept(?), and Price
// let table = new Table({
// 	head: ['TH 1 id', 'TH 2 product_name'],
// 	colWidths: [5, 60]
// });

// table.push(
// 	['First value', 'Second value'],
// );
// console.log(table.toString());



// FUNCTIONS ===========================================
//

function displayProducts() {
	connection.query('SELECT * FROM products', function(error, results) {
		if (error) throw error;
		
		// Raw results logs an array of objects...
		// How can I get this to a format for cli-table...

		// console.log(results);

		// See what's actually being run**********
		console.log(query.sql);
		console.log('-------------');

		// Needs to log id, names, prices ~CHECK
		for (var k = 0; k < results.length; k++) {
			// console.log('ID: '.bold.cyan, results[k].id, ' ', results[k].product_name.cyan, ' ', results[k].price);
			
			console.log(colors.magenta('ID: ', colors.bold(results[k].id), ' ', results[k].product_name, ' ', results[k].price));

			// console.log(colors.magenta(results[k].price));
			console.log(colors.rainbow('-----------------------------------------------------------------'));
		}

		askCustomer();
	});
}

function askCustomer() {
	inquirer.prompt([
		// Inquirer prompt asking user to enter the id of the product they'd like to buy
		{
			type: 'input',
			name: 'itemsToBuy',
			message: colors.white('Please enter the id of the item you wish to buy.')
		},
		// Second prompt asks how many units of the item they'd like to buy
		{
			type: 'input',
			name: 'qtyToBuy',
			message: colors.white('How many of those would you like to buy?')
		}
	])
	.then(function(answer) {
		// Test response  ~WORKS
		// console.log('You selected ' + answer.qtyToBuy + ' of item number: ' + answer.itemsToBuy);
		let query = 'SELECT product_name FROM products WHERE ?';

		connection.query(query, { id: answer.itemsToBuy }, function(error, results) {
			
			for (var i = 0; i < results.length; i++) {
				// console.log('You selected: ' + results[i].product_name);
				// why is the dept_name undefined? results[i].dept_name... since it's not asked for in inquirer?...
				console.log('\nYou\'d like to buy ' + colors.underline(answer.qtyToBuy) + ', "' + results[i].product_name + '"');
				
				console.log('\nLet\'s check if that\'s in stock...\n');
			};	
		});
		// connection.end();
		makeSale();
	});
}

function makeSale() {
	// needs to first check if there's enough inventory to fill the order
	// will the inquirer answers be part of this scope tho.....

	let query = connection.query('UPDATE products SET ? WHERE ?', 
		[
			{
				on_hand_qty: -= answer.qtyToBuy
									// ^^Doensn't like this operator....
			},
			{
				id: answer.itemsToBuy
			}
		],
		function(err, res) {

			// See what's running first
			console.log(query.sql);

			connection.end();
		})

	// Hold items to buy in new variable - new query
	// use that as switch statement argument to check against
	// case in stock, update qty in database, display total purchase cost, log sale successful
	// case out of stock, log 'insufficient qty', log sale unsuccessful

	// switch 

	// connection.end();
}

// Put this at end of last function to run
// connection.end();



// MAIN PROCESS ========================================
// 
