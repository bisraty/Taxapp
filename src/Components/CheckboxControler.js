import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Checkbox from "./Checkbox";
import { JsonFile } from "./JsonFile";
import search from "./search.svg";

const CheckBoxControler = (props) => {
  const { isCheck, setIsCheck } = props;
  const [isCheckAllwithout, setIsCheckAllwithout] = useState(false);
  const [isCheckAllwith, setIsCheckAllwith] = useState(false);
  // const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  const [ListWithCategory, setListWithCategory] = useState([]);
  const [ListWithoutCategory, setListWithoutCategory] = useState([]);
  const [query, setquery] = useState("");
  const [selected, setSelected] = useState("no");

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
    if (event.target.value === "yes") {
      setIsCheck(list.map((li) => li.id.toString()));
      setIsCheckAllwithout(!isCheckAllwithout);
      setIsCheckAllwith(!isCheckAllwith);
    }
  };

  useEffect(() => {
    setList(JsonFile);
    var withCategroy = [];
    var withoutCategroy = [];
    JsonFile?.map((option, index) => {
      if (option?.category) {
        withCategroy = [...withCategroy, option];
      } else {
        withoutCategroy = [...withoutCategroy, option];
      }
    });
    setListWithCategory(withCategroy);
    setListWithoutCategory(withoutCategroy);
  }, []);

  const handleSelectAllwithCategory = (e) => {
    setIsCheckAllwith(!isCheckAllwith);

    setIsCheck(ListWithCategory.map((li) => li.id.toString()));
    if (isCheckAllwith) {
      setIsCheck([]);
    }
  };
  const handleSelectAllwithoutCategory = (e) => {
    setIsCheckAllwithout(!isCheckAllwithout);
    setIsCheck(ListWithoutCategory.map((li) => li.id.toString()));
    if (isCheckAllwithout) {
      setIsCheck([]);
    }
  };
  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  console.log({ isCheck });

  const withcatalog = ListWithCategory.filter((item) =>
    item.name.includes(query)
  ).map(({ id, name }) => {
    // console.log(id);
    return (
      <div className="ml-10">
        <Checkbox
          key={id}
          type="checkbox"
          name={name}
          id={id}
          handleClick={handleClick}
          isChecked={isCheck.includes(id.toString())}
        />
      </div>
    );
  });
  const withoutcatalog = ListWithoutCategory.filter((item) =>
    item.name.includes(query)
  ).map(({ id, name }) => {
    // console.log(id);
    return (
      <div className="ml-10">
        <Checkbox
          key={id}
          type="checkbox"
          name={name}
          id={id}
          handleClick={handleClick}
          isChecked={isCheck.includes(id.toString())}
        />
      </div>
    );
  });
  return (
    <div>
      <div className="radio-buttons">
        <input
          id="yes"
          name="platform"
          type="radio"
          value="yes"
          checked={selected === "yes"}
          onChange={handleChange}
          style={{
            width: "1em",
            height: "1em",
            marginRight: "3px",
            marginTop: "2px",
            background: "white",
            accentColor: "#F16D37",
          }}
        />
        <label htmlFor="yes"> Apply to all items in collection</label>
        <br />
        <br />
        <input
          id="no"
          value="no"
          name="platform"
          type="radio"
          checked={selected === "no"}
          onChange={handleChange}
          style={{
            width: "1em",
            height: "1em",
            marginRight: "3px",
            marginTop: "2px",
            background: "white",
            accentColor: "#F16D37",
          }}
        />
        <label htmlFor="yes"> Apply to specific items</label>
      </div>
      <br />
      <hr></hr>
      <div className="flex items-center bg-white w-[40%]  border border-black-300 p-2 mt-3 rounded-md">
        <p className="text-gray-400 mr-3">
          <img src={search} alt="search" />
        </p>
        <input
          className="flex flex-grow placeholder:text-slate-400 bg-transparent focus:outline-none "
          placeholder="Search Items "
          type="text"
          name="search"
          onChange={(e) => setquery(e.target.value)}
        />
      </div>
      <br />
      <div className="border-solid border-1 p-1 border-[#E5E7EB] bg-[#E5E7EB]  ">
        <Checkbox
          type="checkbox"
          name="Bracelets"
          id="selectAllwith"
          handleClick={handleSelectAllwithCategory}
          isChecked={isCheckAllwith}
        />
      </div>
      {withcatalog}
      <div className="border-solid border-1 p-2 border-[#E5E7EB] bg-[#E5E7EB]  ">
        <Checkbox
          type="checkbox"
          name=""
          id="selectAllwithout"
          handleClick={handleSelectAllwithoutCategory}
          isChecked={isCheckAllwithout}
        />
      </div>
      {withoutcatalog}
    </div>
  );
};

export default CheckBoxControler;
