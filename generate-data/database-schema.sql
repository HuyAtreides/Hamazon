CREATE DATABASE Book_Store
USE Book_Store

CREATE TABLE Author (
	[Id] varchar(100) PRIMARY KEY NOT NULL,
	[Name] nvarchar(100) NOT NULL,
	[Info_Url] varchar(100) NOT NULL,
)

CREATE TABLE Book (
	[Id] int PRIMARY KEY NOT NULL,
	[ISBN] varchar(13),
	[Title] nvarchar(max) NOT NULL,
	[Price] Money NOT NULL,
	[Published] DATE NOT NULL,
	[Pages] INT NOT NULL,
	[Author_Id] varchar(100) FOREIGN KEY REFERENCES Author (Id) ON DELETE CASCADE ON UPDATE CASCADE,
	[Publisher] varchar(100) NOT NULL,
	[Image_Url] varchar(150) NOT NULL,
	[Description] nvarchar(MAX) NOT NULL,
)

CREATE TABLE Genre (
	[Genre] varchar(25) NOT NULL PRIMARY KEY,
)

CREATE TABLE Book_Genre (
	[Genre] varchar(25) not null foreign key references Genre(Genre) ON DELETE CASCADE ON UPDATE CASCADE,
	[Book_Id] int not null foreign key references Book(id) ON DELETE CASCADE ON UPDATE CASCADE,
	Primary key ([Genre], [Book_Id])
)

CREATE TABLE [Shipping_Address] (
	[Id] bigint not null identity primary key,
	[Fullname] nvarchar(max) NOT NULL,
	[Country] nvarchar(70) NOT NULL,
	[Phone_Number] varchar(15) NOT NULL,
	[Address] nvarchar(max) NOT NULL,
	[City] nvarchar(max) NOT NULL,
	[Note] nvarchar(max),
)


CREATE TABLE [User] (
	[Id] bigint identity primary key not null,
	[Username] varchar(30) NOT NULL unique,
	[Email] varchar(70) NOT NULL unique,
	[Password] varchar(max) NOT NULL,
	[Shipping_Address_Id] bigint FOREIGN KEY REFERENCES [Shipping_Address](Id) ON DELETE SET NULL ON UPDATE CASCADE,
)

CREATE TABLE [Cart] (
	[Book_id] int NOT NULL FOREIGN KEY REFERENCES Book (Id) ON DELETE CASCADE ON UPDATE CASCADE,
	[Username] varchar(30) NOT NULL FOREIGN KEY REFERENCES [User] (Username) ON DELETE CASCADE ON UPDATE CASCADE,
	[Amount] int DEFAULT 1,
	PRIMARY KEY ([Book_id], [Username])
)

CREATE TABLE [Order] (
	[Id] bigint not null identity primary key,
	[Book_id] int NOT NULL FOREIGN KEY REFERENCES Book (Id) ON DELETE CASCADE ON UPDATE CASCADE,
	[Username] varchar(30) NOT NULL FOREIGN KEY REFERENCES [User] (Username) ON DELETE CASCADE ON UPDATE CASCADE,
	[Amount] int DEFAULT 1,
	[Shipping_Address_Id] bigint NOT NULL FOREIGN KEY REFERENCES [Shipping_Address](Id),
	[Order_Placed] Date not null,
)




