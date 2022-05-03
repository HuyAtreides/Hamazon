RESTORE DATABASE Book_Store 
FROM DISK = "/usr/hamazon/database/Book_Store.bak"
WITH FILE = 1,
MOVE N'Book_Store' TO N'/var/opt/mssql/data/Book_Store.mdf',  
MOVE N'Book_Store_Log' TO N'/var/opt/mssql/data/Book_Store_Log.ldf',
NOUNLOAD,  REPLACE,  STATS = 1 



