import React, { useState } from 'react';

const DetailQuestion = ({ question, number, answers }: any) => {
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);

  const handleAnswerChange = (answer: any) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl text-blue-700 font-semibold mb-4">Câu {number}: {question}</h2>
      <div className="space-y-2">
        {answers?.map((answer: any) => (
          <label
            key={answer.id}
            className={`flex items-center space-x-2 cursor-pointer ${
              selectedAnswer ? (answer.dung ? 'bg-green-200' : 'bg-red-200') : ''
            }`}
          >
            <input
              type="radio"
              name="answer"
              className={`form-radio h-4 w-4 ${
                selectedAnswer
                  ? answer.dung
                    ? 'text-green-600'
                    : 'text-red-600'
                  : 'text-blue-600'
              }`}
              checked={selectedAnswer?.id === answer.id}
              onChange={() => handleAnswerChange(answer)}
            />
            <span className='text-black font-serif'>{answer.noi_dung}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DetailQuestion;
