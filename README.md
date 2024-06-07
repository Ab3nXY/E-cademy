# E-cademy: E-Learning Platform

E-cademy is a comprehensive e-learning platform built with Django and Django Rest Framework. It allows users to enroll in courses, track their progress, and complete quizzes. Instructors can add courses, materials, and assessments.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User registration and authentication with `django-allauth`
- Course enrollment and progress tracking
- Instructor dashboards for course management
- API endpoints for courses, materials, and assessments
- User-friendly UI with React and Tailwind CSS

## Tech Stack

- **Backend**: Django, Django Rest Framework
- **Frontend**: React, Tailwind CSS
- **Database**: SQLite (default), PostgreSQL (recommended for production)
- **Authentication**: `django-allauth`

## Installation

### Prerequisites

- Python 3.8+
- Node.js and npm (for frontend)
- Virtual environment tool (e.g., `venv`)

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/e-cademy.git
    cd e-cademy
    ```

2. Create and activate a virtual environment:

    ```bash
    python -m venv e-cademy-env
    source e-cademy-env/bin/activate  # On Windows, use `e-cademy-env\Scripts\activate`
    ```

3. Install the required packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Apply migrations:

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

5. Create a superuser:

    ```bash
    python manage.py createsuperuser
    ```

6. Start the development server:

    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the required packages:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

## Usage

### Access the Application

- Open your web browser and navigate to `http://localhost:8000` for the backend.
- The frontend development server will run on `http://localhost:3000`.

### API Endpoints

- View available API endpoints at `http://localhost:8000/api/`.

### Admin Panel

- Access the Django admin panel at `http://localhost:8000/admin/`.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

- **Author**: Abenezer
- **Email**: abenxy0@gmail.com

