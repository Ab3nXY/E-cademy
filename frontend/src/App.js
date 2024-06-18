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
        <div className="flex h-screen z-1000" style={{ backgroundColor: 'transparent' }}>
          <MenuBar />
          {isLoggedIn && user && <Sidebar profile={profile} />}
          
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route path="/profile/" element={<ProfileUpdate />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </Router>
  );
};

export default App;
