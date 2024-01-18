# Stage 1: Build the Angular app
FROM node:latest as builder

WORKDIR /app

# Copy only the package.json and package-lock.json files to install dependencies
COPY ./portfolio/package.json .
COPY ./portfolio/package-lock.json .

# Install npm dependencies
RUN npm install --force

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of the application code
COPY ./portfolio .


# Build the Angular app
RUN ng build --configuration=production

# Stage 2: Serve the Angular app using Nginx
FROM nginx:latest

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf


# Copy the built Angular app from the builder stage
COPY --from=builder /app/dist/portfolio /usr/share/nginx/html

EXPOSE 80
