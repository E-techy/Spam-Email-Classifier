
# SPAM-EMAIL-CLASSIFIER

This application is a simple spam email classifier made in Python. 

It uses the enron_spam_data.csv as the training dataset to identify emails as spam/ham email. 

Sklearn library has been used to train the model.

The application also contains a frontend made using nodejs and express. It can be used to connect to the model and send the body of the emails as a json POST request on the backend application which runs the spam email classifier model.


## Run Locally

Clone the project

```bash
  git clone https://github.com/E-techy/Spam-Email-Classifier.git
```
## Starting the frontend
Go to the Frontend directory

```bash
  cd SPAM-EMAIL-CLASSIFIER/Frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
Now visit this URL to see the frontend
```bash
  http://localhost:4001/
```
## Starting the backend 
Go to the Backend directory

```bash
  cd SPAM-EMAIL-CLASSIFIER/Backend
```
Install dependencies
```bash
    pip install -r requirements.txt
```
Start the backend
```bash
    spam-email-classifier.py
```
The backend will be started on;
```bash
  http://localhost:4002/classify
```

### You have to use a particular format given below to send the emails to the backend model for classification.
![App Screenshot](https://raw.githubusercontent.com/E-techy/Spam-Email-Classifier/refs/heads/main/Screenshots/Sending-POST-request-to-backend-using-postman.png)


## Deploy the project using docker-compose:

Clone the project

```bash
  git clone https://github.com/E-techy/Spam-Email-Classifier.git
```

Go to the project directory

```bash
  cd SPAM-EMAIL-CLASSIFIER
```
### Start the docker daemon
For Linux
```bash
  sudo systemctl start docker
```
For windows use the Docker desktop app to start it or use 
```bash
  Start-Service com.docker.service

```
Start the server
```bash
  docker-compose up --build

```
The URLs will be in the format:
```bash
  http://localhost:<FRONTEND_PORT>
  http://localhost:<BACKEND_PORT>
```
### Environment Variables

If you want to change the ports of the frontend and the backend server you can change the following environment variables in your .env file

`FRONTEND_PORT`  Default 4001 

`BACKEND_PORT` Default 4002


You can visit the frontend and backend on the localhost port you specified in the .env file.


## USAGE / EXAMPLES

### Frontend Page:
Main Page:
![App Screenshot](https://raw.githubusercontent.com/E-techy/Spam-Email-Classifier/refs/heads/main/Screenshots/default-frontend-page.png)

Ham emails:
![App Screenshot](https://raw.githubusercontent.com/E-techy/Spam-Email-Classifier/refs/heads/main/Screenshots/ham-email.png)

Spam emails:
![App Screenshot](https://raw.githubusercontent.com/E-techy/Spam-Email-Classifier/refs/heads/main/Screenshots/spam-email.png)




## Contributing

Contributions are always welcome!

Add changes to the frontend or backend service to make them more useful.

PRs will be merged if they do not introduce any new conflicts and crashes

Please adhere to this project's `code of conduct`.


## License

Everyone is free to use this spam-email-classifier model for private as well as commercial uses.

[MIT](https://choosealicense.com/licenses/mit/)

