FROM node:14-alpine
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy app code
COPY index.js ./

# Run the app
CMD ["node", "index.js"]
