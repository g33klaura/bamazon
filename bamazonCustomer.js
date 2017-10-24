// JavaScript for Bamazon ~ Customer View

/*
Steps to complete:
[] Connection to database
[] 'bamazonCustomer.js' displays all items for sale
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

const mysql = require('mysql');
const table = require('cli-table');


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
