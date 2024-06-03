# Use a Python base image
FROM python:3.12

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY src/server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY src/server/ ./
RUN pip install --no-cache-dir -r requirements.txt

# Command to run your application.
CMD ["python", "__init__.py"]
