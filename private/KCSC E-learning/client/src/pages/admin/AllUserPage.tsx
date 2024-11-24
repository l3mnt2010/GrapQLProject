import UserTable from "../../components/admin/AllUser";
import LeftSection from "../../components/ExamSection/LeftNav/LeftSection";

const AllUserPage = () => {
  return (
    <div>
    <div className="flex overflow-hidden bg-white w-screen h-screen">
      <div className="w-64">
        <LeftSection />
      </div>
      <div className="w-full overscroll-auto h-full ">
          <UserTable />
      </div>
    </div></div>
  );
};

export default AllUserPage;
