import LeftSection from "../components/ExamSection/LeftNav/LeftSection";
import Course from "../components/ExamSection/rightPart/Course";

const CoursePage = () => {

  return (
    <div>
    <div className="flex overflow-hidden bg-white w-screen h-screen">
      <div className="w-64">
        <LeftSection />
      </div>

      <div className="w-full h-full">
          <Course />
      </div>
    </div></div>
  );
};

export default CoursePage;
