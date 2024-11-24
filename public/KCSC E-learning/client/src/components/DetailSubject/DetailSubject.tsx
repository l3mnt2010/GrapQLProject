import React from 'react'
import img1 from './../../assets/images/servicesdetails11.png'

interface SubjectDetailType {
  image?: string,
  name?: string
}

const SubjectDetail:React.FC<SubjectDetailType> = ({image, name}) => {
  return (
    <div className='w-64 rounded-l shadow-2xl h-64 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105'>
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

export default SubjectDetail