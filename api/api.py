from flask import Flask, jsonify, request, send_file
from dotenv import load_dotenv
import geocoder
import requests
import json
import os

# load environment variables
load_dotenv(dotenv_path='../secret.env')

app = Flask(__name__)

@app.route('/api/data', methods=['POST'])
def test():
    # get data from request
    data = request.get_json()
    restType = data.get('keyword').lower()
    price = data.get('maxPrice')
    openN = data.get('opennow').lower()
    maxDistance = data.get('maxDistance')

    print(f'Resturant type: {restType}')
    print(f'Maximum price: {price}') 
    print(f'Open status: {openN}')
    print(f'Maximum distance: {maxDistance}')

    my_api_key = os.getenv('API_KEY')

    g = geocoder.ip('me')
    currLocCoordsURL = str(g.latlng[0]) + "%2C" + str(g.latlng[1])

    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + currLocCoordsURL

    # add values to url string for search
    keyword = restType.lower().replace(" ", "%20")
    if keyword != "":
        keyword = "&keyword=" + keyword
    else:
        keyword = "&keyword=food"

    url = url + keyword

    maxprice = price
    if maxprice != "":
        maxprice = "&maxprice=" + maxprice
    else:
        maxprice = "&maxprice=4"

    url = url + maxprice

    opennow = openN
    if opennow == "n":
        opennow = "&opennow=false"
    else:
        opennow = "&opennow=true"

    url = url + opennow

    radius = maxDistance
    if radius != "":
        radius = str(round(float(radius) * 1609.34))
        radius = "&radius=" + radius
    else:
        radius = str(round(float(100) * 1609.34))
        radius = "&radius=" + radius

    url = url + radius

    # add api key to url
    url = url + my_api_key
    print(url, "\n")

    # converts response to json
    response = requests.get(url)
    response_data = response.json()

    # save data as json file
    file_path = os.path.join(os.getcwd(), 'responseData.json')
    with open(file_path, 'w') as json_file:
        json.dump(response_data, json_file, indent=2)
    
    # return json file dictionary
    return jsonify(response_data)

# return json file
@app.route('/api/json-data')   
def json_data():
    file_path = os.path.join(os.getcwd(), 'responseData.json')
    return send_file(file_path, as_attachment=True, mimetype='application/json')

if __name__ == '__main__':
    app.run(debug=True)
