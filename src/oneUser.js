import React, { useState } from "react";
import "./css/oneUser.css";
import { AiOutlineBarChart } from "react-icons/ai";
import { Link } from "react-router-dom";

function OneUser({ name, id, lastActive }) {
  const [position, setposition] = useState(false);
  return (
    <div className="singleuserBlock">
      <div
        className="userName"
        onMouseEnter={() => setposition(true)}
        onMouseLeave={() => setposition(false)}
      >
        {name}
      </div>
      <Link to={`/activity/${id}`} style={{ textDeclaration: "none" }}>
        <div className="activityButton">
          <AiOutlineBarChart size={25} />
        </div>
      </Link>
      {position ? (
        <div className="lastActive">last Active: {lastActive}</div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default OneUser;
