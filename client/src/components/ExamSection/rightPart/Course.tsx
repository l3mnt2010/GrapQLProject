import { useEffect, useState } from 'react'
import NavBar from '../../Navbar/NavBar'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import CourseDetail from '../../DetailCourse/DetailCourse';
import { getAllCourses } from '../../../utils/api';

const Course = () => {
  const user: any = useSelector((state: RootState)=> state.auth.login.currentUser);
  const [courses, setCourses] = useState<any>([]);
  const navigate = useNavigate();
  const fetchAllCourses = async (token: string) => {
    try {
      const response = getAllCourses(token);
      setCourses(await response);
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    if(user) {fetchAllCourses(user.token)}
    else {
      navigate("/login");
    };
  }, []);
  
  return (
    <div className="w-full h-full">
      <NavBar />
    <div className='grid h-4/5 grid-cols-3 gap-10 pl-20 overflow-y-scroll'>
        {courses?.khoahocs?.map((course: any) =><CourseDetail name={course.ten_khoa} />)}  
    </div>
    </div>
  )
}

export default Course