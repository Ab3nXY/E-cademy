import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';
import { useParams } from 'react-router-dom';

const LessonList = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/lessons/`);
        setLessons(response.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, [courseId]);

  return (
    <div className="lesson-list">
      <h2 className="text-2xl font-bold mb-4">Lessons</h2>
      {lessons.map(lesson => (
        <div key={lesson.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{lesson.title}</h3>
          <p>{lesson.content}</p>
        </div>
      ))}
    </div>
  );
};

export default LessonList;
