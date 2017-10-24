// Nevermind, forgot this controls the package.json...


// REQUIREMENTS ========================================
// 

const mysql = require('mysql');
const table = require('cli-table');
const colors = require('colors');



// VARIABLES & CONSTRUCTORS ============================
// 

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





// FUNCTIONS ===========================================
//



// MAIN PROCESS ========================================
// 
