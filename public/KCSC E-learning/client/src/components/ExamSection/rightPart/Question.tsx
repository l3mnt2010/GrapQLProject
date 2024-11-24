import { useEffect, useState } from 'react'
import NavBar from '../../Navbar/NavBar'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import DetailQuestion from '../../DetailQuestion/DetailQuestion';
import { getAllQuestions } from '../../../utils/api';

const Question = () => {
  const user: any = useSelector((state: RootState)=> state.auth.login.currentUser);
  const [questions, setQuestion] = useState<any>([]);
  const navigate = useNavigate();
  const fetchAllQuestions = async (token: string) => {
    try {
      const response =await getAllQuestions(token);
      setQuestion(response);
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    if(user) {fetchAllQuestions(user.token)}
    else {
      navigate("/login");
    };
  }, []);
  
  return (
    <div className="w-full h-full">
      <NavBar />
    <div className='h-4/5 pl-20 overflow-y-scroll'>
    {questions?.cauhois?.map((question: any, index: number) => (
    <DetailQuestion 
        key={index} 
        number={index + 1} 
        question={question.noi_dung}
        answers = {question.phuongan} 
    />
))}
    </div>
    </div>
  )
}

export default Question