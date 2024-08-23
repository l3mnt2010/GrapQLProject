import React from 'react'
import CourseDetail from '../../DetailCourse/DetailCourse'
import NavBar from '../../Navbar/NavBar'

const Course = () => {
  return (
    <div className="w-full h-full">
      <NavBar />
    <div className='grid grid-cols-3 gap-10 pl-40 pt-24'>
        <CourseDetail name='AT19' />
        <CourseDetail name='AT19'/>
        <CourseDetail name='AT19'/>
        <CourseDetail name='AT19'/>
        <CourseDetail name='AT19' />
        <CourseDetail name='AT19' />
    </div>
    </div>
  )
}

export default Course