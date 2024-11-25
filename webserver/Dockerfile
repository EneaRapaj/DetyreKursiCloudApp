# Use the official NGINX base image
FROM nginx:latest

# Copy your website files to NGINX's default public html directory
COPY ./index.html /usr/share/nginx/html

# Expose port 80 to allow external access
EXPOSE 80

# Command to run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
