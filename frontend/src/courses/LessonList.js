import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faSave } from '@fortawesome/free-solid-svg-icons';
import QuillEditor from './QuillEditor'; // Assuming QuillEditor component is implemented
import { useAuth } from '../AuthContext'; // Correctly import useAuth

const LessonList = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [expandedLessonIds, setExpandedLessonIds] = useState([]);
  const [expandedSubLessonIds, setExpandedSubLessonIds] = useState({});
  const { isAdmin } = useAuth(); // Use isAdmin from useAuth

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

  const handleLessonContentChange = (lessonId, content) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, content } : lesson
      )
    );
  };

  const handleSubLessonContentChange = (lessonId, subLessonId, content) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              sublessons: lesson.sublessons.map((sublesson) =>
                sublesson.id === subLessonId ? { ...sublesson, content } : sublesson
              )
            }
          : lesson
      )
    );
  };

  const saveLessonContent = async (lessonId, content) => {
    try {
      const lessonToUpdate = lessons.find((lesson) => lesson.id === lessonId);
      const updatedLesson = { ...lessonToUpdate, content };
      await axios.put(`/api/courses/${courseId}/lessons/${lessonId}/`, updatedLesson);
      console.log(`Lesson ${lessonId} content saved.`);
      // Handle success feedback if needed
    } catch (error) {
      console.error(`Error saving Lesson ${lessonId} content:`, error);
      // Handle error feedback if needed
    }
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
              {isAdmin && (
                <button
                  onClick={() => saveLessonContent(lesson.id, lesson.content)}
                  className="px-2 text-blue-600 hover:text-blue-800"
                >
                  <FontAwesomeIcon icon={faSave} size="2x" />
                </button>
              )}
            </div>
            {expandedLessonIds.includes(lesson.id) && (
              <div className="mt-4">
                {isAdmin ? (
                  <QuillEditor
                    value={lesson.content}
                    onChange={(content) => handleLessonContentChange(lesson.id, content)}
                  />
                ) : (
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: lesson.content }}
                  />
                )}
                {lesson.sublessons && lesson.sublessons.length > 0 && (
                  <div className="mt-4 ml-6">
                    {lesson.sublessons.map((sublesson) => (
                      <div key={sublesson.id} className="bg-gray-100 p-4 mb-2 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <button
                              onClick={() => toggleSubLesson(lesson.id, sublesson.id)}
                              className="text-blue-600 hover:text-blue-800 focus:outline-none mr-2"
                            >
                              <FontAwesomeIcon
                                icon={
                                  expandedSubLessonIds[`lesson_${lesson.id}`]?.[sublesson.id]
                                    ? faChevronDown
                                    : faChevronRight
                                }
                              />
                            </button>
                            <h4 className="text-lg font-semibold text-blue-700">{sublesson.title}</h4>
                          </div>
                        </div>
                        {expandedSubLessonIds[`lesson_${lesson.id}`]?.[sublesson.id] && (
                          <div className="mt-2">
                            {isAdmin ? (
                              <QuillEditor
                                value={sublesson.content}
                                onChange={(content) =>
                                  handleSubLessonContentChange(lesson.id, sublesson.id, content)
                                }
                              />
                            ) : (
                              <div
                                className="ql-editor"
                                dangerouslySetInnerHTML={{ __html: sublesson.content }}
                              />
                            )}
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
        <p>No lessons found.</p>
      )}
    </div>
  );
};

export default LessonList;
