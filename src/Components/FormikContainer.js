import React, { useState } from "react";
// import { Formik, Form } from "formik";
import { Formik, Form, getIn } from "formik";
import * as Yup from "yup";

import { JsonFile } from "./JsonFile";

import CheckBoxControler from "./CheckboxControler";
export default function FormikContainer() {
  const [query, setquery] = useState("");
  const [isCheck, setIsCheck] = useState([]);

  const initialValues = {
    name: "",
    rate: 5,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required*"),
    rate: Yup.number().required("Required*"),
  });
  const onSubmit = (values) => {
    const { name, rate } = values;
    var alldata = {
      applicable_items: isCheck,

      applied_to: JsonFile.length === isCheck.length ? "all" : "some",

      name: name,
      rate: rate / 100,
    };
    alert(JSON.stringify(alldata));
    console.log();
  };
  function getStyles(errors, fieldName) {
    if (getIn(errors, fieldName)) {
      return {
        border: "1px solid red",
      };
    }
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="flex w-full ">
              <div className="flex items-center space-x-2 w-full">
                {" "}
                <input
                  style={getStyles(formik.errors, "name")}
                  className="placeholder: placeholder:text-slate-400 block bg-white w-[50%]
                border border-black-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none "
                  placeholder="Tax Name"
                  type="text"
                  name="name"
                  id="name"
                  {...formik.getFieldProps("name")}
                />{" "}
                <div
                  style={getStyles(formik.errors, "rate")}
                  className="flex items-center bg-white  border border-black-300 p-2 rounded-md"
                >
                  <input
                    className="flex flex-grow placeholder:text-slate-400 bg-transparent focus:outline-none "
                    placeholder="Tax Value "
                    type="number"
                    name="rate"
                    id="rate"
                    {...formik.getFieldProps("rate")}
                  />
                  <p className="text-gray-400">%</p>
                </div>
              </div>
            </div>
            <br></br>
            <CheckBoxControler isCheck={isCheck} setIsCheck={setIsCheck} />
            <div className="w-full ">
              <button
                type="submit"
                className="bg-[#F4713D] float-right p-2  rounded-sm text-white  hover:bg-[#E54E10]"
              >
                Apply tax to {isCheck.length} item(s)
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
