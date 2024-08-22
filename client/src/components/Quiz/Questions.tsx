// // components/Quiz.tsx
// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState, useAppDispatch } from '../../redux/store';
// // import { RootState, AppDispatch } from '../redux/store';
// // import { loadQuestions, checkAnswer } from '../redux/quizSlice';

// const Question: React.FC<any> = () => {
//     const dispatch = useAppDispatch();
//     const { questions, selectedAnswers, feedback, status, error } = useSelector((state: RootState) => state.quiz);

//     useEffect(() => {
//         if (status === 'idle') {
//             dispatch(loadQuestions());
//         }
//     }, [status, dispatch]);

//     const handleAnswerClick = (questionId: number, answer: string) => {
//         if (selectedAnswers[questionId] !== undefined) return;
//         dispatch(checkAnswer({ questionId, answer }));
//     };

//     if (status === 'loading') {
//         return <div>Loading...</div>;
//     }

//     if (status === 'failed') {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             {questions.map((question) => (
//                 <div key={question.id} style={{ marginBottom: '20px' }}>
//                     <h2>{question.question}</h2>
//                     <ul>
//                         {question.options.map((option) => (
//                             <li
//                                 key={option}
//                                 style={{
//                                     cursor: 'pointer',
//                                     color: feedback[question.id] === null
//                                         ? 'black'
//                                         : feedback[question.id] === (option === question.correctAnswer)
//                                         ? 'green'
//                                         : 'red',
//                                 }}
//                                 onClick={() => handleAnswerClick(question.id, option)}
//                             >
//                                 {option}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Question;
