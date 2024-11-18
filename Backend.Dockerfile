# Use an official Python runtime as a base image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /backend

# Copy the requirements.txt file into the container
COPY ./Backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY ./Backend .

# Copy the .env file from the parent directory into the container
COPY .env /backend/.env

# Set default port to 4000 if not defined in .env
# Load environment variable for backend port from the .env file
RUN export $(cat /backend/.env | xargs) && echo "Using port $BACKEND_PORT"

# Expose the port that the app will run on (fallback to 4000 if BACKEND_PORT is not set)
ARG BACKEND_PORT=4000
EXPOSE ${BACKEND_PORT}

# Command to run the Flask app
CMD ["python", "spam-email-classifier.py"]
