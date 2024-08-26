import React from 'react';

const DetailQuestion = ({ question, number , answers }: any) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl text-blue-700 font-semibold mb-4">Câu {number}:{" "}{question}</h2>
            {/* <div className="space-y-2">
                {answers.map((answer: any, index: number) => (
                    <label key={index} className="flex items-center space-x-2">
                        <input type="radio" name="answer" className="form-radio h-4 w-4 text-blue-600" />
                        <span>{answer}</span>
                    </label>
                ))}
            </div> */}
        </div>
    );
};

export default DetailQuestion;
