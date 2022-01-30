from get_book_list_page import get_book_list_page
import json
import re

genres = [
    # "history",
    # "horror",
    # "travel",
    # "art",
    # "business",
    # "mystery",
    # "fantasy",
    # "thriller",
    # "comics",
    # "science-fiction",
    # "non-fiction",
    # "science",
    # "biography",
    "manga"
]

book_list = []

with open("books.json", "r+") as outfile:
    # for genre in genres:
    #     url = "https://www.goodreads.com/shelf/show/" + genre
    #     books = get_book_list_page(url, genre)
    #     book_list.extend(books)
    file_data = json.load(outfile)
    print(len(file_data))
    # file_data.extend(book_list)
    # json.dump(file_data, outfile)
