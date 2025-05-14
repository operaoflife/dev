FROM node:14-alpine

# Create app directory
WORKDIR /app

# Install dependencies (if you have package.json)
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY index.js ./

# Define runtime command
CMD ["node", "index.js"]
