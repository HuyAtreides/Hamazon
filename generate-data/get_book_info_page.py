from bs4 import BeautifulSoup
import requests
from parse_page import parse


def get_book_info(url, genre, id):
    response = requests.get(url)
    return parse(response.text, genre, id)
