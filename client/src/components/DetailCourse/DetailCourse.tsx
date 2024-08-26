import React from 'react'
import img1 from './../../assets/images/images11.png'

interface CourseDetailType {
  image?: string,
  name?: string
}

const CourseDetail:React.FC<CourseDetailType> = ({image, name}) => {
  return (
    <div className='w-64 rounded-lg shadow-2xl text-white overflow-hidden mt-5 bg-cyan-500 bg-opacity-5 transition-transform duration-300 ease-in-out transform hover:scale-105'>
      <img 
        src={img1} 
        alt={name}  
        className='w-full h-52 rounded-sm object-cover transition-transform duration-300 ease-in-out transform hover:scale-105'
      />
      <div className='text-blue-600 font-bold flex items-center justify-center p-3'>
        {name}
      </div>
    </div>
  );
}

export default CourseDetail