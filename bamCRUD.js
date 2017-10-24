// NOTHING SHOULD USE THIS FILE FOR NOW (10.23)


// REQUIREMENTS ========================================
// 

const mysql = require('mysql');
const table = require('cli-table');



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
