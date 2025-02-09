# Use the Node.js 14 Buster Slim base image
FROM node:14-buster-slim

# Install Tesseract OCR
RUN apt-get update && \
    apt-get install -y tesseract-ocr && \
    rm -rf /var/lib/apt/lists/*

# Create and set the application directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

RUN npm uninstall tesseract.js

RUN npm i node-tesseract-ocr

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["node", "api.js"]
