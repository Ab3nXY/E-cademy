import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { result } = location.state;

  return (
    <div className="mt-10 max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Quiz Result</h2>
      <div className="border border-gray-200 p-6 rounded-lg">
        <p className="text-lg mb-4"><span className="font-semibold">Total Questions:</span> {result.total_questions}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Correct Answers:</span> {result.correct_answers_count}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Score:</span> {result.score.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default Result;
