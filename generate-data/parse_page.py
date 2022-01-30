from bs4 import BeautifulSoup
import random
import re


def parse(page, genre, book_id):
    soup = BeautifulSoup(page, "lxml")
    price = random.uniform(7, 29)
    book = {
        "id": None,
        "isbn": None,
        "genre": None,
        "description": None,
        "title": None,
        "pages": None,
        "publisher": None,
        "imgUrl": None,
        "price": None,
        "published": None,
        "author": {"id": None, "name": None, "infoUrl": None},
    }

    book["id"] = book_id
    book["price"] = price
    book["genre"] = genre

    # Book Description.
    description = soup.find("div", {"id": "description"})
    if description:
        content = list(description.children)[3]
        if content:
            contents = content.contents
            des = "".join(map(lambda x: str(x), contents))
            book["description"] = des

    # Book Title
    h1 = soup.find("h1", {"id": "bookTitle"})
    title = h1.text.strip()
    book["title"] = title

    # Author
    a = soup.find("a", {"class": "authorName"})
    author_info_url = a.get("href")
    author_name = list(a.children)[0].text
    book["author"]["infoUrl"] = author_info_url
    book["author"]["id"] = re.search(r"[0-9]+", author_info_url).group()
    book["author"]["name"] = author_name

    # pages
    span = soup.find("span", {"itemprop": "numberOfPages"})
    pages = span.text.split(" ")[0]
    book["pages"] = pages

    # ISBN
    div = soup.find_all("div", {"class": "infoBoxRowItem"})[1]
    isbn = div.text.strip().split("\n")[0]
    if re.match(r"^[0-9]+$", isbn):
        book["isbn"] = isbn
    else:
        isbn13 = soup.find("span", {"itemprop": "isbn"})
        if isbn13:
            book["isbn"] = isbn13.text.strip()

    # Publisher
    div = soup.find_all("div", {"class": "row"})[1]
    publisherText = div.text.strip().split("by")
    if publisherText:
        book["publisher"] = publisherText[1].strip().split("\n")[0]
        book["published"] = publisherText[0].split("Published")[1].strip()

    # Image Url
    img = soup.find("img", {"id": "coverImage"})
    book["imgUrl"] = img.get("src")

    return book
