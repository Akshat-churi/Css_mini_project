# Minimal Nginx container for packaging and serving the educational virtual lab module
FROM nginx:alpine

# Copy static assets into Nginx webroot
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY data /usr/share/nginx/html/data
COPY tests /usr/share/nginx/html/tests

# Expose standard HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
