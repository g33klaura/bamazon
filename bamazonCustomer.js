// JavaScript for Bamazon ~ Customer View

/*
Steps to complete:
[x] Connection to database
[x] 'bamazonCustomer.js' displays all items for sale
[x] Use fancy tables to display
[x] next, prompts user to enter the id of an item they wish to buy
[x] second prompt asks how many of the item they wish to buy
[x] show "added to cart" or "insufficient qty" message
[x] if purchase is successful, 
	 [x] the qty needs to be subtracted from the database
	 [x] and total of purchase is displayed

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
	// Test log to check for connection  ~WORKS
	// console.log( colors.heman('\nconnected as id ' + connection.threadId + '\n') );

	displayProducts();
});



// VARIABLES & CONSTRUCTORS ============================
// 

// Will hold qty, id, and price of product customer wishes to buy
let cartQty;
let cartId;
let price;

// Will hold integer to set new on_hand_qty to
let updateQty;

// Customer view table displays ID, Product Name, and Price (dept and qty are for management views)
let table = new Table({
	head: ['id', 'product_name', 'price'],
	colWidths: [5, 50, 10]
});



// FUNCTIONS ===========================================
//

function displayProducts() {
	// Use with For loop
	// connection.query('SELECT * FROM products', function(error, results) {

	// Use with tables
	connection.query('SELECT * FROM products', function(error, rows) {

		if (error) throw error;
		
		// Raw results logs an array of objects
		// console.log(results);

		// Loop through results to log the id, names, and retail prices of items available in store
		/*
		for (var k = 0; k < results.length; k++) {
	
			console.log(colors.magenta('ID: ', colors.bold(results[k].id), ' ', results[k].product_name, ' ', results[k].price));

			console.log(colors.rainbow('\n-----------------------------------------------------------------\n'));
		}
		*/

		// ##### CLI-Table #####
		// Table row data from db results
		rows.forEach(function (results) {
			table.push([results.id, results.product_name, results.price]);
		})

		// Table logs to console *fingers crossed*
		console.log(table.toString(), '\n');
		// ##### CLI-Table #####


		// Calls function with prompts for customer to select items & qty to buy
		askCustomer();
	});
}


function askCustomer() {
	inquirer.prompt([
		// Inquirer prompt asking user to enter the id of the product they'd like to buy
		{
			type: 'input',
			name: 'itemsToBuy',
			message: colors.white('What\'s the ID of the item you wish to buy?')
		},
		// Second prompt asks how many units of the item they'd like to buy
		{
			type: 'input',
			name: 'qtyToBuy',
			message: colors.white('How many of those would you like?')
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
				console.log( colors.white('\nYou\'ve added ') + colors.magenta(colors.underline(answer.qtyToBuy) + ', ' + results[i].product_name) + colors.white(' to your cart.') );
				
				console.log( colors.cyan('\nLet\'s check if that\'s in stock...\n') );
			};	
		});

		cartQty = answer.qtyToBuy;
		cartId = answer.itemsToBuy;

		checkQty();
	});
}


// Function to check if the qty is available to be sold, THEN makeSale()
function checkQty() {

	// Log variables set in askCustomer()  ~WORKS
	// console.log('ID to buy:', cartId);
	// console.log('Amount to buy:', cartQty);

	// Do another query to see what the current on_hand_qty is, for the id the user has entered
	connection.query('SELECT id, on_hand_qty, price FROM products WHERE ?',
		{
			id: cartId
		},
			function(err, res) {
				// console.log(res);
				
				for (var q = 0; q < res.length; q++) {
					
					// Test log
					// console.log('Product ID: ' + res[q].id + ' Qty avail: ' + res[q].on_hand_qty);
				
					let currentQty = res[q].on_hand_qty;
						// console.log('currentQty= ' + currentQty);
						
					updateQty = currentQty - cartQty;
						// console.log('Update inventory to: ' + updateQty);
						// console.log('-------------');

					// How do I do the math not tied to this for loop???????
					// Does it matter?....

					// Finally checks qty user wants against available qty
					switch (true) {
						
						// If the update qty is 0 or below, the sale can't be completed
						case (updateQty <= 0):
							console.log(colors.cyan('Sorry, insufficient quantity available. Order cannot be fulfilled.'));
							console.log(colors.cyan('Please try again.\n'));

							// Calls function to display products again
							displayProducts();
							break;

						// All other quantities means there's enough stock to fulfil the order
						default:
							console.log( colors.cyan('Success! Those are in stock.\n') );

							// Call function to update the database and display cart total to customer

							// Have the cart total display off this function? Then inventoryUpdate() does the database update...
							// console.log('\nHOW BOUT NOW?');  //~YES
							// console.log(res[q].price);

							price = res[q].price;
								// console.log(price);

							// Multiply retail price by qty customer wishes to buy
							let cartTotal = price * cartQty;

							console.log(colors.rainbow('+++++++++++++\n'));
								console.log(colors.white('Your total for this purchase is: ') + colors.bold(colors.magenta('$' + cartTotal)));
								console.log(colors.white('Thanks for your your business!\n'));
							console.log(colors.rainbow('+++++++++++++\n'));

							inventoryUpdate();
							break;
					}
				};  //Closes for loop
			});

	// console.log(currentQty);
	// My scope is off............ how to carry the response through?!!
}


function inventoryUpdate() {
	
	let query = connection.query('UPDATE products SET ? WHERE ?', 
		[
			{
				on_hand_qty: updateQty
			},
			{
				id: cartId
			}
		],
		function(err, res) {

			// console.log(query.sql);
			// console.log('-------------LINE 229');

			if (err) throw err;

			console.log( colors.cyan('Order successful\n') );
			// console.log('Inventory qty updated');
			// console.log(res.affectedRows + ' was updated\n');

			// console.log('-------------LINE 237');

			continueShopping();
		});
}


// After successful purchase, ask customer if they'd like to keep shopping
function continueShopping() {

	inquirer.prompt([
		{
			type: 'confirm',
			name: 'buyMore',
			message: colors.white('Would you like to keep shopping?'),
			default: true
		}
	])
	.then(function(response) {
		// If yes, keep shopping
		if (response.buyMore === true) {
			displayProducts();
		} else {
		// If no, send them on their way!
			console.log( colors.rainbow('\nHave a great day!\n') );
			connection.end();
		}
	});
}



// MAIN PROCESS ========================================
// 

// ...is apparently all functions within functions
