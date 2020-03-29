import flask
from flask import render_template
from flask import request, jsonify
from flask_cors import CORS

#modules related to geeksforgeeks code
# importing libraries 
import requests 
from bs4 import BeautifulSoup 
from tabulate import tabulate 
import os 
import numpy as np 
import matplotlib.pyplot as plt

URL = 'https://www.mohfw.gov.in/'   #url from where we get data
def getAllStatesCovidData():
    extract_contents = lambda row: [x.text.replace('\n', '') for x in row] 

    SHORT_HEADERS = ['SNo', 'State','Indian-Confirmed', 'Foreign-Confirmed','Cured','Death'] 

    response = requests.get(URL).content 
    soup = BeautifulSoup(response, 'html.parser') 
    header = extract_contents(soup.tr.find_all('th')) 

    stats = [] #stores all lists where each list be like ['sno', 'statename', 'totalConfirmed-IndianNational', 'totalConfirmed-ForeignNational', 'cured', 'death']
    all_rows = soup.find_all('tr') 

    for row in all_rows: 
            stat = extract_contents(row.find_all('td')) 
            if stat: 
                    if len(stat) == 6: 
                            stats.append(stat)

    """code to convert strings data into int and then send total confirmed from indian and foreign nationals """
    data = {} #will store keys and values, where keys is state names and values is also object like {confirmed: 1, recovered:1, deaths:0}
    #print(stats)
    for row in stats:
        try:
            val = {"confirmed":int(row[2]) + int(row[3]), "recovered": int(row[4]), "deaths": int(row[5])}
            data[row[1]] = val;
        except:
            continue
    #print(data)
    return data




app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return render_template("index.html", data = getAllStatesCovidData())

# A route to return all of the states covid statistics data
@app.route('/getAllStatesCovidData', methods=['GET'])
def api_all():
    return jsonify(getAllStatesCovidData())

app.run()


