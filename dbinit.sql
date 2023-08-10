CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  provider VARCHAR(100) NOT NULL,
  is_national BOOLEAN NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE price_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  modification_date DATETIME NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);
