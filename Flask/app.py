import pickle
import requests
import re
import numpy as np
import pandas as pd
books=pickle.load(open('books.pkl','rb'))
final=pickle.load(open('final_pivot_table.pkl','rb'))
books_df=pickle.load(open('popular_books.pkl','rb'))
similarity_scores=pickle.load(open('similarity_scores.pkl','rb'))
def find_matching_books(input_name):
    matching_books = books[books['Book-Title'].str.contains(input_name, case=False)]
    return list(matching_books['Book-Title'].values)

def suggest_books(book_name, books=books, final=final, similarity_scores=similarity_scores):
    try:   
        # Search for exact book name
        exact_match_index = np.where(final.index == book_name)[0][0]
        similar_books_exact = sorted(list(enumerate(similarity_scores[exact_match_index])), key=lambda x: x[1], reverse=True)[1:10]
        
        exact_books = []
        for i in similar_books_exact:
            temp_df = books[books['Book-Title'] == final.index[i[0]]]
            item = [
                temp_df.drop_duplicates('Book-Title')['Book-Title'].values[0],
                temp_df.drop_duplicates('Book-Title')['Book-Author'].values[0],
                temp_df.drop_duplicates('Book-Title')['Image-URL-L'].values[0],
                temp_df.drop_duplicates('Book-Title')['ISBN'].values[0],
                temp_df.drop_duplicates('Book-Title')['Year-Of-Publication'].values[0]
            ]
            exact_books.append(item)
    except Exception as e:
        print(e)
        exact_books = []

    try:
        # Handle similar book names
        similar_names = find_matching_books(book_name)
        for similar_name in similar_names[:11]:
            temp_df = books[books['Book-Title'] == similar_name]
            item = [
                temp_df.drop_duplicates('Book-Title')['Book-Title'].values[0],
                temp_df.drop_duplicates('Book-Title')['Book-Author'].values[0],
                temp_df.drop_duplicates('Book-Title')['Image-URL-L'].values[0],
                temp_df.drop_duplicates('Book-Title')['ISBN'].values[0],
                temp_df.drop_duplicates('Book-Title')['Year-Of-Publication'].values[0]
            ]
            exact_books.append(item)
    except Exception as e:
        print(e)
        exact_books = []
    
    return exact_books
def get_exact(name):
    list_books=suggest_books(name)
    match_book=books[books['Book-Title'] == name ]
    item = [
                match_book.drop_duplicates('Book-Title')['Book-Title'].values[0],
                match_book.drop_duplicates('Book-Title')['Book-Author'].values[0],
                match_book.drop_duplicates('Book-Title')['Image-URL-L'].values[0],
                match_book.drop_duplicates('Book-Title')['ISBN'].values[0],
                match_book.drop_duplicates('Book-Title')['Year-Of-Publication'].values[0]
            ]
    list_books.insert(0,item)
    return list_books

def get_popular(books_df=books_df):
    exact_books = []
    for i in range(len(books_df)):
        item = [
            books_df.iloc[i]['Book-Title'],
            books_df.iloc[i]['Book-Author'],
            books_df.iloc[i]['Image-URL-L'],
            books_df.iloc[i]['ISBN'],
            books_df.iloc[i]['Year-Of-Publication']
        ]
        exact_books.append(item)
    return exact_books


# print(suggest_books('harry potter'))
from flask import Flask,jsonify,request,render_template
from flask_cors import CORS   # Import the CORS extension
app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
@app.route("/")
def index():
    return render_template("index.html",token="FlaskReact")
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")
@app.route('/api/books/<name>', methods=['POST'])  # Use angle brackets for route parameters
def process_data(name):  # Match the argument name with the route parameter name
    try:
        data = request.json  # Assuming the data is sent as JSON
        # Process the data here
        book_suggestions=suggest_books(name)
        response_data = {"message": book_suggestions}
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
@app.route('/api/popular/', methods=['POST'])  # Use angle brackets for route parameters
def popular():  # Match the argument name with the route parameter name
    try:
        data = request.json  # Assuming the data is sent as JSON
        # Process the data here
        popular_books=get_popular(books_df=books_df)
        response_data = {"message": popular_books}
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/api/books/e/<name>', methods=['POST'])  # Use angle brackets for route parameters
def simple_book(name):  # Match the argument name with the route parameter name
    try:
        data = request.json  # Assuming the data is sent as JSON
        # Process the data here
        book_suggestions=get_exact(name)
        response_data = {"message": book_suggestions}
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400



if __name__ == '__main__':
    app.run(debug=True)
