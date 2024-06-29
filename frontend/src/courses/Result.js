import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Result = () => {
  const { lessonId, courseId } = useParams();
  const location = useLocation();
  const { result } = location.state;

  return (
    <div>
      <h2>Result</h2>
      <p>{result.message}</p>
      <ul>
        {result.correct_answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
