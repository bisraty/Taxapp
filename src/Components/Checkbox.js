import React from "react";

const Check = ({ id, type, name, handleClick, isChecked }) => {
  return (
    <div className=" flex items-center space-x-5 p-2 rounded-md ">
      <input
        id={id}
        name={name}
        type={type}
        onChange={handleClick}
        checked={isChecked}
        style={{
          width: "1em",
          height: "1em",
          outline: "2px solid #3F8298",
          background: "white",
          accentColor: "white",
          absolute: "absolute",
          marginLeft: "2px",
        }}
      />
      <h1> {name}</h1>
    </div>
  );
};

export default Check;
