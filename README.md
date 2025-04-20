# IT Support Assistant

An AI-powered IT support system built with Django and React. This application helps users get immediate answers to their IT questions and schedule appointments with IT support staff.

## Features

- AI-powered question answering system
- Automated ticket classification
- Appointment scheduling system
- User authentication and authorization
- Question history tracking
- Real-time response generation
- Mobile-responsive design

## Tech Stack

### Backend
- Django
- Django REST Framework
- SimpleJWT for authentication
- Gemini AI for response generation
- Custom ML model for ticket classification
- SQLite database (configurable for PostgreSQL)

### Frontend
- React
- Tailwind CSS
- Material-UI
- Ant Design
- Axios
- React Router
- React Markdown

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8+
- Node.js 14+
- npm or yarn
- Git

## Installation

1. **Clone the repository**
```bash
git clone 
cd 
```

2. **Set up the backend**
```bash
# Create and activate virtual environment
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start the server
python manage.py runserver
```

3. **Set up the frontend**
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

4. **Environment Variables**
Create a `.env` file in the backend directory with the following:
```
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
GEMINI_API_KEY=your_gemini_api_key
```

## Usage

1. Access the frontend at `http://localhost:3000`
2. Access the backend API at `http://localhost:8000`
3. Access the Django admin interface at `http://localhost:8000/admin`

## API Endpoints

- `/api/questions/` - Question creation and listing
- `/api/questions/history/` - User question history
- `/api/questions/history/<id>/` - Specific question details
- `/login/` - User authentication
- `/signup/` - User registration
- `/profile/` - User profile management

## Development

1. **Backend Dependencies**
```bash
pip install -r requirements.txt
```

2. **Frontend Dependencies**
```bash
npm install
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

Your Name - [@yourusername](https://github.com/yourusername)

Project Link: [https://github.com/yourusername/it-support-assistant](https://github.com/yourusername/it-support-assistant)
