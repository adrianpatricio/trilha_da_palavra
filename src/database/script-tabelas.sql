CREATE DATABASE trilha_da_palavra;

USE trilha_da_palavra;

CREATE TABLE livro (
	id_livro INT PRIMARY KEY,
    nome_livro VARCHAR(30) NOT NULL,
    testamento CHAR(2) NOT NULL, -- AT ou NT
    quantidade_capitulos INT NOT NULL,
    
    CONSTRAINT ch_testamento CHECK (testamento IN ('AT', 'NT')),
    CONSTRAINT ch_quantidade_capitulos CHECK (quantidade_capitulos BETWEEN 1 AND 150)
);

CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(100) NOT NULL,
    email_usuario VARCHAR(100) NOT NULL UNIQUE,
    senha_usuario VARCHAR(100) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL DEFAULT 'USER',
    avatar_usuario VARCHAR(20) NOT NULL DEFAULT 'inicial',
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_livro_favorito INT,
    
    CONSTRAINT ch_tipo_usuario CHECK (tipo_usuario IN ('USER', 'ADMIN')),
    CONSTRAINT fk_livro_usuario FOREIGN KEY (fk_livro_favorito) REFERENCES livro (id_livro)
);

CREATE TABLE leitura (
	id_leitura INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT UNIQUE,
    fk_livro INT  UNIQUE,
    capitulo INT UNIQUE,
    data_leitura DATE,
    
    CONSTRAINT ch_capitulo CHECK (capitulo > 0),
    
    CONSTRAINT fk_usuario_leitura FOREIGN KEY (fk_usuario) REFERENCES usuario (id_usuario),
    CONSTRAINT fk_livro_leitura FOREIGN KEY (fk_livro) REFERENCES livro (id_livro)
);

INSERT INTO livro (id_livro, nome_livro, testamento, quantidade_capitulos) VALUES
	(1, 'Gênesis', 'AT', 50), 
	(2, 'Êxodo', 'AT', 40), 
	(3, 'Levítico', 'AT', 27), 
	(4, 'Números', 'AT', 36),
	(5, 'Deuteronômio', 'AT', 34), 
	(6, 'Josué', 'AT', 24), 
	(7, 'Juízes', 'AT', 21), 
	(8, 'Rute', 'AT', 4),
	(9, '1 Samuel', 'AT', 31), 
	(10, '2 Samuel', 'AT', 24), 
	(11, '1 Reis', 'AT', 22), 
	(12, '2 Reis', 'AT', 25),
	(13, '1 Crônicas', 'AT', 29), 
	(14, '2 Crônicas', 'AT', 36), 
	(15, 'Esdras', 'AT', 10), 
	(16, 'Neemias', 'AT', 13),
	(17, 'Ester', 'AT', 10), 
	(18, 'Jó', 'AT', 42), 
	(19, 'Salmos', 'AT', 150), 
	(20, 'Provérbios', 'AT', 31),
	(21, 'Eclesiastes', 'AT', 12), 
	(22, 'Cânticos', 'AT', 8), 
	(23, 'Isaías', 'AT', 66), 
	(24, 'Jeremias', 'AT', 52),
	(25, 'Lamentações', 'AT', 5), 
	(26, 'Ezequiel', 'AT', 48), 
	(27, 'Daniel', 'AT', 12), 
	(28, 'Oseias', 'AT', 14),
	(29, 'Joel', 'AT', 3), 
	(30, 'Amós', 'AT', 9), 
	(31, 'Obadias', 'AT', 1), 
	(32, 'Jonas', 'AT', 4),
	(33, 'Miqueias', 'AT', 7), 
	(34, 'Naum', 'AT', 3), 
	(35, 'Habacuque', 'AT', 3), 
	(36, 'Sofonias', 'AT', 3),
	(37, 'Ageu','AT', 2), 
	(38, 'Zacarias', 'AT', 14), 
	(39, 'Malaquias', 'AT', 4),
	(40, 'Mateus', 'NT', 28), 
	(41, 'Marcos', 'NT', 16), 
	(42, 'Lucas', 'NT', 24), 
	(43, 'João', 'NT', 21),
	(44, 'Atos', 'NT', 28), 
	(45, 'Romanos', 'NT', 16), 
	(46, '1 Coríntios', 'NT', 16), 
	(47, '2 Coríntios', 'NT', 13),
	(48, 'Gálatas', 'NT', 6), 
	(49, 'Efésios', 'NT', 6), 
	(50, 'Filipenses', 'NT', 4), 
	(51, 'Colossenses', 'NT', 4),
	(52, '1 Tessalonicenses', 'NT', 5), 
	(53, '2 Tessalonicenses', 'NT', 3), 
	(54, '1 Timóteo', 'NT', 6),
	(55, '2 Timóteo', 'NT', 4), 
	(56, 'Tito', 'NT', 3), 
	(57, 'Filemom', 'NT', 1), 
	(58, 'Hebreus', 'NT', 13),
	(59, 'Tiago', 'NT', 5), 
	(60, '1 Pedro', 'NT', 5), 
	(61, '2 Pedro', 'NT', 3), 
	(62, '1 João', 'NT', 5),
	(63, '2 João', 'NT', 1), 
	(64, '3 João', 'NT', 1), 
	(65, 'Judas', 'NT', 1), 
	(66, 'Apocalipse', 'NT', 22);
  
INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, tipo_usuario, avatar_usuario, fk_livro_favorito) VALUES
	('adrian', 'admin@trilha.com', '#admin123', 'ADMIN', 'davi', 19),
	('leitor', 'leitor@trilha.com', '#leitor123', 'USER',  'iniciais', NULL);