# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Serve Stage
FROM nginx:stable-alpine
COPY --from=build /app/dist/zela-app/browser /usr/share/nginx/html
# If you have a custom nginx config, you can copy it here:
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
