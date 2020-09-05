import React, { useEffect, useState } from "react";
import "./css/userActivity.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Link } from "react-router-dom";

function UserActivity(props) {
  const [color, setcolor] = useState(false);
  const [value, setValue] = useState(new Date());
  const activeUser = useSelector((state) => state.activeUser);
  const activehours = useSelector((state) => state.activehours);
  const activeDays = useSelector((state) => state.activeDays);
  const activity = useSelector((state) => state.activity);
  const activeList = useSelector((state) => state.activeList);
  const dispatch = useDispatch();

  function onChange(nextValue) {
    setValue(nextValue);
    console.log("slelcted date", nextValue);
  }

  const updateActivity = () => {
    let processed3 = value.toString().split(" ");
    let y = processed3[2];
    if (y[0] == 0) {
      processed3[2] = y[1];
    }

    let processed4 = processed3[1] + " " + processed3[2] + " " + processed3[3];

    for (let j = 0; j < activeList.length; j++) {
      let x = activeList[j];

      let temp = x.start_time.split(" ");
      let tempE = x.end_time.split(" ");
      let temp1 = temp[0] + " " + temp[1] + " " + temp[2];

      if (temp1 === processed4) {
        dispatch({
          type: "SET_C_ACTIVITY",
          data: `start: ${x.start_time}, end: ${x.end_time}`,
        });

        let timeline = [];

        if (x.start_time.endsWith("PM")) {
          let a = temp[3].split(":");
          let b = tempE[3].split(":");
          let ax = parseInt(a[0]) + 12;
          let bx = parseInt(b[0]) + 12;
          for (let i = ax; i < bx + 1; i++) {
            timeline.push(i);
          }
        } else if (x.start_time.endsWith("AM")) {
          if (x.end_time.endsWith("AM")) {
            let a = temp[3].split(":");
            let b = tempE[3].split(":");
            let ax = parseInt(a[0]);
            let bx = parseInt(b[0]);
            for (let i = ax; i < bx + 1; i++) {
              timeline.push(i);
            }
          } else {
            let a = temp[3].split(":");
            let b = tempE[3].split(":");
            let ax = parseInt(a[0]);
            let bx = parseInt(b[0]) + 12;
            for (let i = ax; i < bx + 1; i++) {
              timeline.push(i);
            }
          }
        }
        let superList = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ];
        for (let k = 0; k < timeline.length; k++) {
          let v = timeline[k];
          superList[v - 1] = 1;
        }
        dispatch({ type: "SET_HOURS", data: superList });
        return null;
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: "SET_C_ACTIVITY",
      data: "",
    });
    dispatch({
      type: "SET_HOURS",
      data: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    });
    updateActivity();
  }, [value]);

  useEffect(() => {
    console.log(props.match.params);
    let data = { id: props.match.params };
    axios
      .post(
        "https://job-assignment-4-dabibu.herokuapp.com/api/oneUserData",
        data
      )
      .then((res) => {
        console.log("data", res.data);
        dispatch({ type: "SET_A_USER", data: res.data });
        dispatch({ type: "SET_A_LIST", data: res.data.activity_periods });
        let activeDates = [];
        res.data.activity_periods.map((startEnd) => {
          let processed1 = startEnd.start_time.split(" ");
          if (processed1[1].length === 1) {
            processed1[1] = "0" + processed1[1];
          }
          if (processed1 === "Jan") {
            let processed2 = processed1[1] + "-" + "01" + "-" + processed1[2];
            activeDates.push(processed2);
          } else if (processed1[0] === "Feb") {
            let processed2 = processed1[1] + "-" + "02" + "-" + processed1[2];
            activeDates.push(processed2);
          } else if (processed1[0] === "Mar") {
            let processed2 = processed1[1] + "-" + "03" + "-" + processed1[2];
            activeDates.push(processed2);
          } else if (processed1[0] === "Apr") {
            let processed2 = processed1[1] + "-" + "04" + "-" + processed1[2];
            activeDates.push(processed2);
          } else if (processed1[0] === "May") {
            let processed2 = processed1[1] + "-" + "05" + "-" + processed1[2];
            activeDates.push(processed2);
          } else if (processed1[0] === "Jun") {
            let processed2 = processed1[1] + "-" + "06" + "-" + processed1[2];
            activeDates.push(processed2);
          } else if (processed1[0] === "Jul") {
            let processed2 = processed1[1] + "-" + "07" + "-" + processed1[2];
            activeDates.push(processed2);
          } else if (processed1[0] === "Aug") {
            let processed2 = processed1[1] + "-" + "08" + "-" + processed1[2];
            activeDates.push(processed2);
          } else if (processed1[0] === "Sep") {
            let processed2 = processed1[1] + "-" + "09" + "-" + processed1[2];
            activeDates.push(processed2);
          } else if (processed1[0] === "Oct") {
            let processed2 = processed1[1] + "-" + "10" + "-" + processed1[2];
            activeDates.push(processed2);
          } else if (processed1[0] === "Nov") {
            let processed2 = processed1[1] + "-" + "11" + "-" + processed1[2];
            activeDates.push(processed2);
          } else if (processed1[0] === "Dec") {
            let processed2 = processed1[1] + "-" + "12" + "-" + processed1[2];
            activeDates.push(processed2);
          }
        });
        dispatch({ type: "SET_A_DATES", data: activeDates });
      });
  }, []);
  return (
    <div>
      <div className="header2">
        <div className="hLeft">ACTIVITY</div>
        <Link to="/" style={{ textDecoration: "none", cursor: "default" }}>
          <div className="hRight">BACK TO USERS</div>
        </Link>
      </div>
      <div className="activityDataBlock">
        <div className="activeUserName">{activeUser?.real_name}</div>
        <div className="activityBlock">
          <div className="calendar">
            <Calendar
              showNeighboringMonth={false}
              onChange={onChange}
              value={value}
              className="mainCalendar"
              minDate={new Date("2020-01-01")}
              tileClassName={({ date, view }) => {
                if (
                  activeDays?.find(
                    (x) => x === moment(date).format("DD-MM-YYYY")
                  )
                ) {
                  return "highlight";
                }
              }}
            ></Calendar>
          </div>
          <div className="activityText">
            {activity ? activity : "No activity"}
          </div>
          <div className="timeLine">
            <div className="headding">ACTIVE HOURS</div>
            <div className="hoursBox">
              {activehours?.map((x) => (
                <div className={x == 0 ? "switch0" : "switch1"}></div>
              ))}
            </div>
            <hr />
            <div className="thoursBox">
              <div className="thour">1</div>
              <div className="thour">2</div>
              <div className="thour">3</div>
              <div className="thour">4</div>
              <div className="thour">5</div>
              <div className="thour">6</div>
              <div className="thour">7</div>
              <div className="thour">8</div>
              <div className="thour">9</div>
              <div className="thour">10</div>
              <div className="thour">11</div>
              <div className="thour">12</div>
              <div className="thour">13</div>
              <div className="thour">14</div>
              <div className="thour">15</div>
              <div className="thour">16</div>
              <div className="thour">17</div>
              <div className="thour">18</div>
              <div className="thour">19</div>
              <div className="thour">20</div>
              <div className="thour">21</div>
              <div className="thour">22</div>
              <div className="thour">23</div>
              <div className="thour">24</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserActivity;
