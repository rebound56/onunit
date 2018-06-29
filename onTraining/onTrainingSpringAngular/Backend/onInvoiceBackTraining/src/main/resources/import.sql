INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Julian', 'Parra', 'julian.m.parra@gmail.com', '8436045', '1234567890', 'M', '2016-09-02', '2017-01-02');

INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Mauricio', 'Montenegro', 'mauro.rebound.56@gmail.com', '8569411', '0987654321', 'M', '2017-03-01', '2018-03-02');

INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Laura', 'Tocancipa', 'laura.tocancipa@gmail.com', '3452345', '12345321', 'F','2017-03-01', '2018-03-02');

INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Jairo', 'Corredor', 'jairo.corredor@gmail.com', '5678921', '93858797', 'M', '2017-03-01', '2018-03-02');

INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Viviana', 'Gomez', 'viviana.gomez@gmail.com', '9876323', '9856096', 'F','2017-03-01', '2018-03-02');

INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Myriam', 'Salas', 'myriam.salas@gmail.com', '4562345', '23232323', 'F','2017-03-01', '2018-03-02');

INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Alberto', 'Lopez', 'alberto.lopez@gmail.com', '0987666', '54654654', 'M', '2017-03-01', '2018-03-02');

INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Sandra', 'Castro', 'sandra.castro@gmail.com', '2314567', '6748356348', 'F','2017-03-01', '2018-03-02');

INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Camila', 'Beltran', 'camila.beltran@gmail.com', '8769809', '4758935', 'F','2017-03-01', '2018-03-02');

INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Adriana', 'Pachon', 'adriana.pachon@gmail.com', '5434678', '3839482', 'F','2017-03-01', '2018-03-02');

INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Paulo', 'Castiblanco', 'paulo.castiblanco@gmail.com', '5437688', '89567', 'M', '2017-03-01', '2018-03-02');

INSERT INTO person (name, last_name, email, phone, number_document, gender, created_at, modified_at) VALUES  ('Lina', 'Escobar', 'lina.escobar@gmail.com', '3433434', '7889998', 'F','2017-03-01', '2018-03-02');

INSERT INTO product (name, description, gross_price_per_unit, gross_taxes_per_unit, created_at , modified_at) VALUES ('TV SAMSUNG 55', 'Smart tv of 55', 3220 , 80, NOW(), NOW());
INSERT INTO product (name, description, gross_price_per_unit, gross_taxes_per_unit, created_at , modified_at) VALUES ('LAPTOP LENOVO', 'Laptop lenovo i7', 1510 , 90, NOW(), NOW());
INSERT INTO product (name, description, gross_price_per_unit, gross_taxes_per_unit, created_at , modified_at) VALUES ('MOUNTAIN BIKE', 'Mountain bike', 1208 , 42, NOW(), NOW());


INSERT INTO user (username, password, enabled, created_at , modified_at) VALUES ('julian','$2a$10$O9wxmH/AeyZZzIS09Wp8YOEMvFnbRVJ8B4dmAMVSGloR62lj.yqXG',1, '2016-09-02', '2017-01-02');
INSERT INTO user (username, password, enabled, created_at , modified_at) VALUES ('admin','$2a$10$DOMDxjYyfZ/e7RcBfUpzqeaCs8pLgcizuiQWXPkU35nOhZlFcE9MS',1, '2016-09-02', '2017-01-02');

INSERT INTO role (user_id, authority) VALUES (1,'ROLE_USER');
INSERT INTO role (user_id, authority) VALUES (2,'ROLE_ADMIN');
INSERT INTO role (user_id, authority) VALUES (2,'ROLE_USER');