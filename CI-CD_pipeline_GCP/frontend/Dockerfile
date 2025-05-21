# — Build stage
FROM node:18-alpine AS builder
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build -- --mode production

# — Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# copy your custom nginx.conf (must be in the build context)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
