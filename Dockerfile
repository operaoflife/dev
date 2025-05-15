FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY index.js ./
CMD ["node", "index.js"]
