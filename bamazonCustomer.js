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

// Will hold qty and id of product customer wishes to buy
let cartQty;
let cartId;
let price;

// Empty var to hold on_hand_qty from DB
// let currentQty = 0;

// Will hold integer to set new on_hand_qty to
let updateQty;



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
	// console.log('ID to buy:', cartId);
	// console.log('Amount to buy:', cartQty);
	console.log('-------------');

	// Do another query to see what the current on_hand_qty is, for the id the user has entered
	connection.query('SELECT id, on_hand_qty, price FROM products WHERE ?',
		{
			id: cartId
		},
			function(err, res) {
				// console.log(res);
				
				for (var q = 0; q < res.length; q++) {
					console.log('Product ID: ' + res[q].id + ' Qty avail: ' + res[q].on_hand_qty);
				
					let currentQty = res[q].on_hand_qty;
						// console.log('currentQty= ' + currentQty);
						
					updateQty = currentQty - cartQty;
						console.log('Update inventory to: ' + updateQty);
						console.log('-------------');


					// How do I do the math not tied to this for loop???????
					// Does it matter....

					// Finally checks qty user wants against available qty
					switch (true) {
						
						// If the update qty is 0 or below, the sale can't be completed
						case (updateQty <= 0):
							console.log('Sorry, insufficient quantity available. Order cannot be fulfilled.');
							console.log('Please try again.');
							// Calls function to display products again
							displayProducts();
							break;

						// All other quantities means there's enough stock to fulfil the order
						default:
							console.log('Success! Those are in stock.');

							// Call function to update the database and display cart total to customer

							// Have the cart total display off this function? Then makeSale() does the database update...
							// console.log('\nHOW BOUT NOW?');  //~YES
							// console.log(res[q].price);

							// now, need to multiply price by purchase qty********
							price = res[q].price;
								// console.log(price);

							let cartTotal = price * cartQty;

								console.log('Your total for this purchase is: $' + cartTotal);
								console.log('Thanks for your your business!\n');

							makeSale();
							break;
					}
				};  //Closes for loop
				// console.log('Is this thing on? ' + currentQty);
				// No, no it is not on............
			});

	// console.log(currentQty);
	// My scope is off............ how to carry the response through?!!
}


// Might be better to rename inventoryUpdate...*********
function makeSale() {
	
	let query = connection.query('UPDATE products SET ? WHERE ?', 
		[
			{
				on_hand_qty: updateQty
			},
			{
				// id: answer.itemsToBuy
				id: cartId
			}
		],
		function(err, res) {

			console.log(query.sql);
			console.log('-------------');

			if (err) throw err;

			console.log('Inventory qty updated');
			console.log(res.affectedRows + ' was updated\n');
			// console.log(res.affectedRows + ' was updated\n');
			console.log('-------------');
			// Log full response so know what to drill in to...
				// Nooooot what I was expecting... hrm...
			// console.log(res);

			// connection.end();
			continueShopping();
		});

	// connection.end();
}


function continueShopping() {

	inquirer.prompt([
		{
			type: 'confirm',
			name: 'buyMore',
			message: 'Would you like to make another purchase?',
			default: true
		}
	])
	.then(function(response) {
		if (response.buyMore === true) {
			displayProducts();
		} else {
			console.log('Have a great day!\n');
			connection.end();
		}
	});
}




// MAIN PROCESS ========================================
// 

// ...is apparently all functions within functions
