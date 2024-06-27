import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const LessonList = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [expandedLessonIds, setExpandedLessonIds] = useState([]);
  const [expandedSubLessonIds, setExpandedSubLessonIds] = useState({});

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

  const toggleLesson = (lessonId) => {
    setExpandedLessonIds((prevState) =>
      prevState.includes(lessonId)
        ? prevState.filter((id) => id !== lessonId)
        : [...prevState, lessonId]
    );
  };

  const toggleSubLesson = (lessonId, subLessonId) => {
    const lessonKey = `lesson_${lessonId}`;
    setExpandedSubLessonIds((prevState) => ({
      ...prevState,
      [lessonKey]: {
        ...prevState[lessonKey],
        [subLessonId]: !prevState[lessonKey]?.[subLessonId]
      }
    }));
  };

  const renderContentWithHTML = (content) => {
    // Replace newline characters with HTML line breaks
    const formattedContent = content.replace(/\n/g, '<br>');

    // Render content with dangerouslySetInnerHTML to allow HTML
    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };

  return (
    <div className="lesson-list">
      {lessons.length > 0 ? (
        lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white p-6 mb-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => toggleLesson(lesson.id)}
                  className="text-blue-600 hover:text-blue-800 focus:outline-none mr-2"
                >
                  <FontAwesomeIcon icon={expandedLessonIds.includes(lesson.id) ? faChevronDown : faChevronRight} />
                </button>
                <h3 className="text-xl font-semibold text-blue-800">{lesson.title}</h3>
              </div>
            </div>
            {expandedLessonIds.includes(lesson.id) && (
              <div className="mt-4">
                {renderContentWithHTML(lesson.content)}
                {lesson.sublessons && lesson.sublessons.length > 0 && (
                  <div className="mt-4 ml-6">
                    {lesson.sublessons.map((sublesson) => (
                      <div key={sublesson.id} className="bg-gray-100 p-4 mb-2 rounded-md shadow-sm">
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleSubLesson(lesson.id, sublesson.id)}
                            className="text-blue-600 hover:text-blue-800 focus:outline-none mr-2"
                          >
                            <FontAwesomeIcon icon={expandedSubLessonIds[`lesson_${lesson.id}`]?.[sublesson.id] ? faChevronDown : faChevronRight} />
                          </button>
                          <h5 className="text-md font-semibold text-blue-700">{sublesson.title}</h5>
                        </div>
                        {expandedSubLessonIds[`lesson_${lesson.id}`]?.[sublesson.id] && (
                          <div className="mt-2">
                            {renderContentWithHTML(sublesson.content)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No lessons available.</p>
      )}
    </div>
  );
};

export default LessonList;
