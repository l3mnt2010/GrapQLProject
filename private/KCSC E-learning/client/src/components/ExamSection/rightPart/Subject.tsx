import { useEffect, useState } from 'react'
import NavBar from '../../Navbar/NavBar'
import { getAllSubjects } from '../../../utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import SubjectDetail from '../../DetailSubject/DetailSubject';

const Subject = () => {
  const user: any = useSelector((state: RootState)=> state.auth.login.currentUser);
  const [subjects, setSubjects] = useState<any>([]);
  const navigate = useNavigate();
  const fetchAllSubjects = async () => {
    try {
      const response = getAllSubjects(user.token);
      setSubjects(await response);
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    if(user) {fetchAllSubjects()}
    else {
      navigate("/login");
    };
  }, []);
  
  return (
    <div className="w-full h-full">
      <NavBar />
    <div>
      <div className='grid h-4/5 grid-cols-3 gap-10 pl-20 overflow-y-scroll'>
        {subjects?.monhocs?.map((subject: any) =><SubjectDetail name={subject.ten_mon} />)}  
      </div>
    </div>
    </div>
  )
}

export default Subject