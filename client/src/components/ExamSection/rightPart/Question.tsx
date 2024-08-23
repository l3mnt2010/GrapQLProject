import React from "react";
import NavBar from "../../Navbar/NavBar";

const Question = () => {
  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="bg-white pt-32">
        <div className="mb-4">
          <p className="text-gray-800 font-bold">
          Câu 1:    A can lay railway track between two given stations in 16 days and B
            can do the same job in 12 days. With the help of C, they did the job
            in 4 days only. Then, C alone can do the job in:
          </p>

          <div className="mt-4">
            <fieldset>
              <div className="flex text-black flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="flex text-black items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex text-black items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="mr-2"
                  />
                  Other
                </label>
                <label className="flex text-black items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
