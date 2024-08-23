import LeftSection from "../components/ExamSection/LeftNav/LeftSection";
import Course from "../components/ExamSection/rightPart/Course";
import Subject from "../components/ExamSection/rightPart/Subject";

const SubjectPage = () => {

  return (
    <div>
    <div className="flex overflow-hidden bg-white w-screen h-screen">
      <div className="w-64">
        <LeftSection />
      </div>

      <div className="w-full h-full">
          <Subject />
      </div>
    </div></div>
  );
};

export default SubjectPage;
