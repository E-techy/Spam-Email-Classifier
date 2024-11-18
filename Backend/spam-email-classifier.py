import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Setting the path for the .env file
load_dotenv(dotenv_path='/backend/.env')

backend_port = os.getenv('BACKEND_PORT', '4000')  # Default to 4000 if not found
frontend_port = os.getenv('FRONTEND_PORT', '3000')  # Default to 3000 if not found

# list for the allowed URLs which can connect to this service
allowed_CORS = "http://localhost:"+ frontend_port


# Loading and preprocessing the Enron spam data
def load_data():
    # Reading the .csv data file
    df = pd.read_csv("enron_spam_data.csv")
    df = df[['Message', 'Spam/Ham']].dropna()
    df['Spam/Ham'] = df['Spam/Ham'].map({'spam': 1, 'ham': 0})
    return df

# Training the model with the updated dataset
def train_model():
    df = load_data()
    X_train, X_test, y_train, y_test = train_test_split(df['Message'], df['Spam/Ham'], test_size=0.2, random_state=42)
    
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer()),
        ('nb', MultinomialNB())
    ])
    
    pipeline.fit(X_train, y_train)
    
    y_pred = pipeline.predict(X_test)

    # Some details to show how much accuracy the model has got from the training dataset.
    print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
    print(classification_report(y_test, y_pred))
    
    joblib.dump(pipeline, "spam_classifier_model.pkl")
    print("Model saved as spam_classifier_model.pkl")


# Setting up the Flask app to set and endpoint for the URL where the frontend can send requests
# to process the email as spam/ham.
app = Flask(__name__)

# Allowing only the URL of the frontend to connect to this service by setting the CORS policy
CORS(app, resources={r"/*": {"origins":allowed_CORS }}, supports_credentials=True)

model = None


# Endpoint to classify email as spam or ham
@app.route('/classify', methods=['POST'])
def classify():
    global model
    if model is None:
        # Loading the model if it is not already present, from the spam_classifier_model.pkl file.
        model = joblib.load("spam_classifier_model.pkl")
    
    # Accepting the POST requests from the clients in a JSON format
    data = request.get_json()

    # Returning error if the data or the body is not present in the request of the client.
    if not data or "body" not in data:
        return jsonify({"error": "Invalid input"}), 400
    email_content = data["body"]

    # Predicting whether the email content is spam or ham based of the model trained above
    prediction = model.predict([email_content])[0]
    label = "spam" if prediction == 1 else "ham"
    return jsonify({"label": label}), 200

# Run the training process and start the app
# The app will be hosted on all network interfaces as the host is set to "0.0.0.0"
if __name__ == "__main__":
    train_model()
    app.run(host="0.0.0.0",port=int(backend_port))
