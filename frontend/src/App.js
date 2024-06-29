import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/tailwind.css'; // Assuming Tailwind CSS for styling
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import MenuBar from './components/Menubar';
import ProfileUpdate from './components/profile';
import { useAuth } from './AuthContext';
import InstructorDashboard from './courses/InstructorDashboard';
import StudentDashboard from './courses/StudentDashboard'; 
import Courses from './courses/Courses';
import CourseDetail from './courses/CourseDetail';
import Quiz from './courses/Quiz';
import FinalExam from './courses/FinalExam';
import Result from './courses/Result';


const App = () => {
  const user = useSelector((state) => state.user.data);
  const profile = useSelector((state) => state.profile.data);

  const { isLoggedIn } = useAuth();
  const Dashboard = () => {
    if (user && (profile?.role === 'instructor' || profile?.role === 'admin')) {
      return <InstructorDashboard />;
    } else if (user && profile?.role === 'student') {
      return <StudentDashboard />;
    }
  };
  return (
      <Router>
        <div className="flex h-screen" style={{ backgroundColor: 'transparent' }}>
          <MenuBar />
          {isLoggedIn &&  <Sidebar profile={profile} />}
          
          <main className="flex-1 overflow-auto">
            <Routes>
              {isLoggedIn && <Route path="/" element={<Dashboard />} />}
              <Route exact path="/" element={<LandingPage />} />
              <Route path="/profile/" element={<ProfileUpdate />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
              <Route path="/courses" element={<Courses />} />
              <Route exact path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/courses/:courseId/lessons/:lessonId/quiz" element={<Quiz />} />
              <Route path="/courses/:courseId/lessons/:lessonId/result" element={<Result />} />
              <Route path="/courses/:courseId/final-exam" element={<FinalExam />} />
              <Route path="/courses/:courseId/final-exam/result" element={<Result />}/>
            </Routes>
          </main>
        </div>
      </Router>
  );
};

export default App;
