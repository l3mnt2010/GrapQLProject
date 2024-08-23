import React from 'react'
import CourseDetail from '../../DetailCourse/DetailCourse'
import NavBar from '../../Navbar/NavBar'

const Subject = () => {
  return (
    <div className="w-full h-full">
      <NavBar />
    <div className='grid grid-cols-3 gap-10 pl-40 pt-24'>
        <CourseDetail name='Nguyên Lý Hệ Điều Hành' />
        <CourseDetail name='Hệ quản trị cơ sở dữ liệu'/>
        <CourseDetail name='Tiếng anh 3'/>
        <CourseDetail name='CTDL và GT'/>
        <CourseDetail name='Kỹ thuật truyền số liệu' />
    </div>
    </div>
  )
}

export default Subject