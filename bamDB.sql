DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(60) NOT NULL,
	dept_name VARCHAR(30) NOT NULL,
	MSRP INT NOT NULL,
	on_hand_qty INT,
	PRIMARY KEY(id)
);

-- DON'T DO THIS IN MYSQL PRO YET; MAKE SURE ALL QUESTIONS ANSWERED AS FAR AS DEPARTMENTS, ETC. 
-- Remember, you've managed stores ~ you've handled -actual- inventories, so DON"T OVER THINK THIS!!!!

-- Item 1
INSERT INTO products (product_name, dept_name, MSRP, on_hand_qty)
VALUES ('Professor Layton and the Azran Legacy', 'Video Game', 54.28, 1);

-- Item 2
INSERT INTO products (product_name, dept_name, MSRP, on_hand_qty)
VALUES ('Mario and Luigi: Dream Team', 'Video Game', 34.99, 4);

-- Item 3
INSERT INTO products (product_name, dept_name, MSRP, on_hand_qty)
VALUES ('Subtle Art of Not Giving a F*ck, The', 'Book', 14.99, 118);

-- Item 4
INSERT INTO products (product_name, dept_name, MSRP, on_hand_qty)
VALUES ('Dark Crystal, The / Labyrinth / Mirrormask', 'DVD', 9.44, 14);

-- Item 5
INSERT INTO products (product_name, dept_name, MSRP, on_hand_qty)
VALUES ('Broad City, Season 1', 'DVD', 9.96, 22);

-- Item 6
INSERT INTO products (product_name, dept_name, MSRP, on_hand_qty)
VALUES ('Unf*ck Your Brain', 'Book', 14.95, 0);

-- Item 7
INSERT INTO products (product_name, dept_name, MSRP, on_hand_qty)
VALUES ('There\'s a Hair in My Dirt!', 'Book', 10.62, 162);

-- Item 8
INSERT INTO products (product_name, dept_name, MSRP, on_hand_qty)
VALUES ('Exploding Kittens Card Game', 'Game', 19.99, 2);

-- Item 9
INSERT INTO products (product_name, dept_name, MSRP, on_hand_qty)
VALUES ('Magnetic Travel Chess', 'Game', 10.96, 15);

-- Item 10
INSERT INTO products (product_name, dept_name, MSRP, on_hand_qty)
VALUES ('Lovely: Ladies of Animation', 'Book', 23.91, 9);

-- ~WORKS!
