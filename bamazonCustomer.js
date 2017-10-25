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
	console.log('\nconnected as id ' + connection.threadId + '\n');

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

// Empty var to later hold qty customer wishes to buy
let cartQty = 0;
let cartId = 0;

// Empty var to hold on_hand_qty from DB
let currentQty = 0;



// FUNCTIONS ===========================================
//

function displayProducts() {
	connection.query('SELECT * FROM products', function(error, results) {
		if (error) throw error;
		
		// Raw results logs an array of objects...
		// How can I get this to a format for cli-table...

		// console.log(results);

		// See what's actually being run**********Says query undefined...
				// ^^Think it's because the clause string isn't being stored in a variable, like it is in askCustomer()
		// console.log(query.sql);
		// console.log('-------------');

		// Needs to log id, names, prices ~DONE

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

		// This version of query, stores the query clause string in the variable of "query"
		let query = 'SELECT product_name FROM products WHERE ?';

		connection.query(query, { id: answer.itemsToBuy }, function(error, results) {
			
			for (var i = 0; i < results.length; i++) {
				// console.log('You selected: ' + results[i].product_name);
				// why is the dept_name undefined? results[i].dept_name... since it's not asked for in inquirer?...
				console.log('\nYou\'d like to buy ' + colors.underline(answer.qtyToBuy) + ', "' + results[i].product_name + '"');
				
				console.log('\nLet\'s check if that\'s in stock...\n');
			};	
		});

		cartQty = answer.qtyToBuy;
		cartId = answer.itemsToBuy;

		// connection.end();
		// makeSale();
		checkQty();
	});
}

// Function to check if the qty is available to be sold, THEN makeSale()
function checkQty() {

	// Log variables set in askCustomer()  ~WORKS
	console.log('ID to buy:', cartId);
	console.log('Amount to buy:', cartQty);
	console.log('-------------');

	// Do another query to see what the current on_hand_qty is, for the id the user has entered
	connection.query('SELECT id, on_hand_qty FROM products WHERE ?',
		{
			id: cartId
		},
			function(err, res) {
				// console.log(res);
				
				for (var q = 0; q < res.length; q++) {
					console.log(res[q].id + ' Qty avail: ' + res[q].on_hand_qty);
				
					currentQty = res[q].on_hand_qty;
						console.log(currentQty);

				};
			}	
	);

	// console.log(currentQty);
	// My scope is off............ how to carry the response through?!!


	// If stock is avail, store the number to subtract from the o/h in a new variable
		// See if that new number can be subtracted in the make sale function?
		// Or should it be the -actual- number to set the new o/h too?... more like the updateProducts() in the ice cream example...



	makeSale();

}



function makeSale() {
	// needs to first check if there's enough inventory to fill the order
	// will the inquirer answers be part of this scope tho.....
	// console.log(answer.qtyToBuy);
	// yeah, not in the scope....... hrm............
	// console.log('ID to buy: ', cartId);
	// console.log('Amount to buy: ', cartQty);


	// let query = connection.query('UPDATE products SET ? WHERE ?', 
	// 	[
	// 		{
	// 			on_hand_qty: -= answer.qtyToBuy
	// 								// ^^Doesn't like this operator....
	// 								// Save the amount to update the total by in another var??
	// 		},
	// 		{
	// 			id: answer.itemsToBuy
	// 		}
	// 	],
	// 	function(err, res) {

	// 		// See what's running first
	// 		console.log(query.sql);

	// 		connection.end();
	// 	})

	// Hold items to buy in new variable - new query
	// use that as switch statement argument to check against
	// case in stock, update qty in database, display total purchase cost, log sale successful
	// case out of stock, log 'insufficient qty', log sale unsuccessful

	// switch 

	connection.end();
}

// Put this at end of last function to run
// connection.end();



// MAIN PROCESS ========================================
// 
