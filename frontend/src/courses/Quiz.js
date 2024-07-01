import React, { useEffect, useState } from 'react';
import axios from '../components/axiosSetup';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Quiz = () => {
  const { courseId, lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch quiz questions for the lesson
    axios.get(`/api/courses/${courseId}/lessons/${lessonId}/assessments/`)
      .then(response => {
        if (response.data.length > 0) {
          setQuestions(response.data[0].questions);
        }
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, [courseId, lessonId]);

  const formik = useFormik({
    initialValues: {
      answers: []
    },
    validationSchema: Yup.object({
      answers: Yup.array().of(Yup.string().required('Answer is required'))
    }),
    onSubmit: values => {
      axios.post(`/api/courses/${courseId}/lessons/${lessonId}/assessments/submit/`, values)
        .then(response => {
          console.log('Submitted answers:', values.answers);
          navigate(`/courses/${courseId}/lessons/${lessonId}/result`, { state: { result: response.data } });
        })
        .catch(error => console.error('Error submitting answers:', error));
    }
  });


  return (
    <form onSubmit={formik.handleSubmit} className="mt-10 max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz</h2>
      {questions.map((question, index) => (
        <div key={question.id} className="mb-6 p-4 border border-gray-200 rounded-lg shadow-md">
          <p className="mb-2 text-lg font-bold">{index + 1}. {question.question_text}</p>
          <div className="space-y-2">
            {['option_1', 'option_2', 'option_3', 'option_4'].map((option, optionIndex) => (
              <label key={optionIndex} className="block">
                <input
                  type="radio"
                  name={`answers.${index}`}
                  value={question[option]}
                  onChange={formik.handleChange}
                  checked={formik.values.answers[index] === question[option]}
                  className="mr-2"
                />
                <span className="ml-2">{question[option]}</span>
              </label>
            ))}
          </div>
          {formik.errors.answers && formik.errors.answers[index] ? (
            <div className="text-red-500 mt-2">{formik.errors.answers[index]}</div>
          ) : null}
        </div>
      ))}
      <button type="submit" className="w-1/5 py-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
        Submit
      </button>
    </form>
  );
};


export default Quiz;
