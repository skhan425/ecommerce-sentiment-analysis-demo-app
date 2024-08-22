from playwright.sync_api import sync_playwright
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import random
import time
import json
import flask
from flask import request
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)
sia = SentimentIntensityAnalyzer()

@app.route("/test", methods=["GET", "POST"])
def testing():
    url = request.args.get("url")
    if not url: return flask.jsonify({"error:": "missing product url"})
    response = flask.jsonify({
        "title": url,
        "image": "https://i.kym-cdn.com/entries/icons/original/000/031/673/hank_died_walt_cries_(breaking_bad_spoilers)_1-35_screenshot.png",
        "description": "test description",
        "reviews": "test reviews"
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#@app.route("/", methods=["GET", "POST"])
def hello():
    #return '<p> Hello world </p>'
    return flask.jsonify({'hello': 'world'})

'''
def sentiment_analysis(review):
    sia = SentimentIntensityAnalyzer()

    sentiment_scores = sia.polarity_scores(review['content'])
    print(f'Review: {review['content']}')
    print(f'Sentiment Scores: {sentiment_scores}')
    compound = sentiment_scores['compound']
    if compound >= 0.05:
        sentiment = 'Positive'
    elif compound <= -0.05:
        sentiment = 'Negative'
    else:
        sentiment = 'Neutral'
    print(f"Overall Sentiment: {sentiment}\n")'''


@app.route("/result", methods=["GET", "POST"])
def process_url(num_reviews=1):
    product_url = request.args.get("url")
    if product_url == None: return 400

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()

        try:
            with open('cookies.json', 'r') as f:
                cookies = json.load(f)
                context.add_cookies(cookies)
        except FileNotFoundError:
            pass
        
        page = context.new_page()

        # Go to the product page
        page.goto(product_url)
        time.sleep(random.uniform(1, 3))

        title = page.title()
        image = page.locator('#landingImage').get_attribute('src')
        #description = page.locator('#feature-bullets').inner_html()

        # Wait for the reviews section to load
        page.wait_for_selector('div[data-hook="review"]')

        reviews = []
        while len(reviews) < num_reviews:
            review_elements = page.query_selector_all('div[data-hook="review"]')

            for element in review_elements:
                if len(reviews) >= num_reviews:
                    break
                review = {}
                review['rating'] = element.query_selector('i[data-hook="review-star-rating"] span').inner_text().strip()
                review['content'] = element.query_selector('span[data-hook="review-body"]').inner_text().strip()
                review['sentiment'] = sia.polarity_scores(review['content'])
                
                reviews.append(review)

            '''
            for element in review_elements:
                if len(reviews) >= num_reviews:
                    break
                review = {}
                review['title'] = element.query_selector('a[data-hook="review-title"]').inner_text().strip()
                review['rating'] = element.query_selector('i[data-hook="review-star-rating"] span').inner_text().strip()
                review['content'] = element.query_selector('span[data-hook="review-body"]').inner_text().strip()
                reviews.append(review)
            '''

            # Check if there's a "Next" page button and click it
            next_button = page.query_selector('li.a-last a')
            if next_button and not next_button.get_attribute('aria-disabled'):
                next_button.click()
                page.wait_for_selector('div[data-hook="review"]')  # Wait for new reviews to load
            else:
                break
        
        cookies = context.cookies()
        with open('cookies.json', 'w') as f:
            json.dump(cookies, f)

        browser.close()

        return flask.jsonify({
            'title': title, 
            'image': image, 
            #'description': description,
            'reviews': json.dumps(reviews)
        })


        '''
        return flask.jsonify({
            title,
            image,
            description,
            reviews
        })'''
 
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
    #product_url = 'https://www.amazon.com/h/dp/B099WN4MKW'
    #print(hello())
    #response = process_url(product_url, num_reviews=3)
    #print(response)
    #print(json.dumps(response, indent=2))
    #print(json.dumps(reviews, indent=2))
