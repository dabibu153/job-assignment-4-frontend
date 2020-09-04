import React, { useEffect } from "react";
import "./css/userList.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import OneUser from "./oneUser";

function UserList() {
  const userList = useSelector((state) => state.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://job-assignment-4-dabibu.herokuapp.com/api/userList")
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "SET_USERS", data: res.data });
      });
  }, []);
  return (
    <div>
      <div className="header1">USERS</div>
      <div className="listBlock">
        <div className="userList">
          {userList?.map((user) => (
            <OneUser
              key={user.id}
              id={user.id}
              name={user.name}
              lastActive={user.lastActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
