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
      .then(response => setQuestions(response.data))
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
          navigate.push(`/courses/${courseId}/lessons/${lessonId}/result`, { result: response.data });
        })
        .catch(error => console.error('Error submitting answers:', error));
    }
  });

  useEffect(() => {
    formik.setFieldValue('answers', questions.map(() => ''));
  }, [questions]);

  return (
    <form onSubmit={formik.handleSubmit}>
      {questions.map((question, index) => (
        <div key={question.id} className="mb-4">
          <p>{question.question_text}</p>
          <div>
            {['option_1', 'option_2', 'option_3', 'option_4'].map(option => (
              <label key={option}>
                <input
                  type="radio"
                  name={`answers.${index}`}
                  value={question[option]}
                  onChange={formik.handleChange}
                  checked={formik.values.answers[index] === question[option]}
                />
                {question[option]}
              </label>
            ))}
          </div>
          {formik.errors.answers && formik.errors.answers[index] ? (
            <div className="text-red-500">{formik.errors.answers[index]}</div>
          ) : null}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
        Submit
      </button>
    </form>
  );
};

export default Quiz;
