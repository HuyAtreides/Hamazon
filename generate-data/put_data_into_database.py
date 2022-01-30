import json
import pyodbc
from datetime import datetime
import re

server = "DESKTOP-CE9VQ6G"
database = "Book_Store"
username = "sa"
password = "1234567z@Z"

cnxn = pyodbc.connect(
    "DRIVER={ODBC Driver 17 for SQL Server};SERVER="
    + server
    + ";DATABASE="
    + database
    + ";UID="
    + username
    + ";PWD="
    + password,
    autocommit=False,
)
cursor = cnxn.cursor()

books = json.load(open("./books.json"))
for book in books:
    try:
        author = book["author"]
        time_str = re.sub(r"(?<=[0-9])(?:st|nd|rd|th)", "", book["published"], flags=re.IGNORECASE)

        try:
            published = datetime.strptime(time_str, "%B %d %Y")
        except Exception:
            try:
                published = datetime.strptime(time_str, "%B %d")
            except Exception:
                try:
                    published = datetime.strptime(time_str, "%B %Y")
                except Exception:
                    try:
                        published = datetime.strptime(time_str, "%B")
                    except Exception:
                        try:
                            published = datetime.strptime(time_str, "%Y")
                        except Exception:
                            try:
                                published = datetime.strptime(time_str, "%d")
                            except Exception:
                                try:
                                    published = datetime.strptime(time_str, "%d %Y")
                                except Exception:
                                    try:
                                        published = datetime.strptime(time_str, "%Y-%m-%d")
                                    except Exception:
                                        print(time_str)
                                        published = None

        cursor.execute(
            """
            IF NOT EXISTS (SELECT Id FROM Author WHERE Id = ?)
                BEGIN
                    INSERT INTO Author (Id, Name, Info_Url) VALUES (?, ?, ?)
                END
        """,
            (int(author["id"]), int(author["id"]), author["name"], author["infoUrl"]),
        )
        cursor.execute(
            """
                IF NOT EXISTS (SELECT id FROM Book WHERE id = ?)
                    BEGIN
                        INSERT INTO Book (id, ISBN, Title, Price, Published, Pages, Author_Id, Publisher, Image_Url, Description)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    END
            """,
            (
                int(book["id"]),
                int(book["id"]),
                book["isbn"],
                book["title"],
                book["price"],
                published.strftime("%Y-%m-%d %H:%M:%S") if published else None,
                int(book["pages"]),
                int(author["id"]),
                book["publisher"],
                book["imgUrl"],
                book["description"],
            ),
        )
        genre = book["genre"]

        cursor.execute(
            """
                IF NOT EXISTS (SELECT genre FROM GENRE WHERE genre = ?)
                    BEGIN
                        INSERT INTO Genre (Genre) VALUES (?)
                    END
            """,
            (
                genre,
                genre,
            ),
        )
        cursor.execute(
            """
                IF NOT EXISTS (SELECT genre, book_id FROM book_GENRE WHERE genre = ? AND book_id = ?)
                    BEGIN
                        INSERT INTO book_genre (Genre, book_id) VALUES (?, ?)
                    END
            """,
            (
                genre,
                int(book["id"]),
                genre,
                int(book["id"]),
            ),
        )
        cnxn.commit()
    except Exception as e:
        print(e)
        cnxn.close()
        break
