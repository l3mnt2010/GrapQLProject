import LeftSection from "../components/ExamSection/LeftNav/LeftSection";
import Subject from "../components/ExamSection/rightPart/Subject";

const SubjectPage = () => {
  return (
    <div>
    <div className="flex bg-white w-screen h-screen">
      <div className="w-64">
        <LeftSection />
      </div>
      <div className="w-full overflow-auto h-full">
        <Subject />
      </div>
    </div></div>
  );
};

export default SubjectPage;
