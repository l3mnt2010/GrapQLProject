import React from 'react'
import LeftSection from '../components/ExamSection/LeftNav/LeftSection';
import Question from '../components/ExamSection/rightPart/Question';

const QuestionPage = () => {
  return (
    <div>
    <div className="flex bg-white w-screen h-screen">
      <div className="w-64">
        <LeftSection />
      </div>

      <div className="w-full overflow-auto h-full">
          <Question />
      </div>
    </div></div>
  );
}

export default QuestionPage