# Web Platform Course Assignment

This project is a web platform that needs to be developed based on the following specifications.

## Assignment Overview

### 1. Infrastructure in Docker (20 points)

- **a. Build an image for the web server**:  
  Create a Docker image that will serve as the web server for the platform. The web server will handle incoming requests, process them, and send appropriate responses.

- **b. Build an image for the database**:  
  Create a Docker image for the database that will store all the platform data, including user information, profile data, and authentication details.

- **c. Configure communication between them (Docker Compose)**:  
  Use Docker Compose to configure and connect the web server and database images, enabling seamless communication between the two components.

### 2. Web Platform (30 points)

- **a. Technology**:  
  Use Java or the Spring framework to build the web platform. Spring Boot can be a good choice for this task due to its flexibility and ease of use in web development.

- **b. User authentication module**:  
  Implement a user authentication system that allows users to sign in using their email/phone number and password.

- **c. User registration module**:  
  - Fields: Name, Paternity, Surname, Phone Number, Date of Birth, Email, Password, Confirm Password.  
  - Ensure proper validation for each field during registration (e.g., length limits, format checking).

- **d. User profile management**:  
  After successful authentication, users should be redirected to their profile. The profile will display the user's data, which can be modified. Users will also have the ability to upload and edit their profile picture.

- **e. Administrator functionality**:  
  - An administrator will be able to log into the platform and see a list of all users.  
  - The administrator will have the ability to modify user data or delete users from the platform.

- **f. User data validation**:  
  Ensure the following data validation rules are implemented for registration and profile editing:
  - First name, Paternity, and Last name: Only letters allowed, max 20 characters.
  - Phone number: Must start with `+355` followed by 9 digits (e.g., `+35569xxxxxxx`).
  - Date of birth: Must be a valid date.
  - Email: Only one valid email format is allowed (e.g., `example@domain.com`).
  - Password: Must have a minimum of 8 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character.

### 3. Frontend (Initial Setup)

- **Frontend Development**:  
  The frontend part of the platform has been started. It will eventually be developed further, but currently, it is just a basic structure or placeholder to show progress.

---

## Getting Started

### Prerequisites

Before running the project, ensure you have the following software installed on your machine:

- Docker
- Docker Compose
- Java (if using Spring Boot)

### Project Setup

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/your-repo/web-platform-assignment.git
    ```

2. Navigate to the project directory:
    ```bash
    cd web-platform-assignment
    ```

3. Build the Docker images:
    ```bash
    docker-compose build
    ```

4. Start the Docker containers:
    ```bash
    docker-compose up
    ```

5. Access the web platform by navigating to `http://localhost:8080` in your browser.

---

## Evaluation Criteria

- **Infrastructure in Docker (20 points)**:
  - Proper Docker images for the web server and database.
  - Correct configuration of Docker Compose for communication.

- **Web Platform Features (30 points)**:
  - Functional user authentication and registration.
  - Ability to view and modify user profiles.
  - Administrator functionality for managing users.
  - Correct validation of user input during registration and profile editing.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Thank you to the course instructors and assistants for their guidance throughout the project.

"# DetyreKursiCloudApp" 
