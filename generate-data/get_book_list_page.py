import requests
from bs4 import BeautifulSoup
import re
from get_book_info_page import get_book_info

base_url = "https://www.goodreads.com"


def get_book_list_page(url, genre):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "lxml")
    books = []
    book_list = soup.find_all("a", {"class": "bookTitle"})
    for book in book_list:
        try:
            uri = book.get("href")
            book_id = re.search(r"[0-9]+", uri)
            book_info_url = base_url + uri
            books.append(get_book_info(book_info_url, genre, book_id.group()))
        except:
            continue
    return books
