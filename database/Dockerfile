# Use the official PostgreSQL base image
FROM postgres:latest

# Set environment variables (optional)
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=root
ENV POSTGRES_DB=cloudapp

# Expose default PostgreSQL port
EXPOSE 2022:5432

# (Optional) Copy initialization scripts
# COPY ./init.sql /docker-entrypoint-initdb.d/

# (Optional) Uncomment above if you have an initialization script
