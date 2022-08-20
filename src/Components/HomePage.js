import React from "react";
import FormikContainer from "./FormikContainer";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto flex justify-center bg-white shadow-md p-5 border border-gray-100 rounded-md">
      <div className=" w-full p-3">
        <p className="text-[25px] py-3 text-gray-700">Add Tax</p>

        <FormikContainer />

        <br></br>
      </div>
    </div>
  );
}
