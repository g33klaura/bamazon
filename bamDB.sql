-- Bamazon Schema (initial database setup) & Seeds (data values)

DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(60) NOT NULL,
	dept_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	on_hand_qty INT,
	PRIMARY KEY(id)
);


-- Item 1
INSERT INTO products (product_name, dept_name, price, on_hand_qty)
VALUES ('Professor Layton and the Azran Legacy', 'Video Game', 54.28, 1);

-- Item 2
INSERT INTO products (product_name, dept_name, price, on_hand_qty)
VALUES ('Mario and Luigi: Dream Team', 'Video Game', 34.99, 4);

-- Item 3
INSERT INTO products (product_name, dept_name, price, on_hand_qty)
VALUES ('Ready Player One', 'Book', 9.99, 118);

-- Item 4
INSERT INTO products (product_name, dept_name, price, on_hand_qty)
VALUES ('Dark Crystal, The / Labyrinth / Mirrormask', 'DVD', 9.44, 14);

-- Item 5
INSERT INTO products (product_name, dept_name, price, on_hand_qty)
VALUES ('Broad City, Season 1', 'DVD', 9.96, 22);

-- Item 6
INSERT INTO products (product_name, dept_name, price, on_hand_qty)
VALUES ('Armada', 'Book', 16.00, 42);

-- Item 7
INSERT INTO products (product_name, dept_name, price, on_hand_qty)
VALUES ('There\'s a Hair in My Dirt!', 'Book', 10.62, 162);

-- Item 8
INSERT INTO products (product_name, dept_name, price, on_hand_qty)
VALUES ('Exploding Kittens Card Game', 'Game', 19.99, 2);

-- Item 9
INSERT INTO products (product_name, dept_name, price, on_hand_qty)
VALUES ('Magnetic Travel Chess', 'Game', 10.96, 15);

-- Item 10
INSERT INTO products (product_name, dept_name, price, on_hand_qty)
VALUES ('Lovely: Ladies of Animation', 'Book', 23.91, 9);

-- ~WORKS!
