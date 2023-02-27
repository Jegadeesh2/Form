import React, { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import Notifications from "./Notifications";
import reducer from "../reducer";

const defaultState = {
  students: [],
  isNotification: false,
  messageText: "",
};

const Form = () => {
  //Hooks
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [gender, setGender] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultState);

  //Functions

  const submitHandler = (event) => {
    event.preventDefault();
    // Validation
    if (name && age && course && isChecked ) {
      const newStudent = { id: uuidv4(), name, age, course, gender};
      dispatch({ type: "ADD_ITEM", load: newStudent });
      setName("");
      setAge("");
      setCourse("");
      setGender("")
      setIsChecked(false)
    } else {
      dispatch({ type: "NO_ITEM" });
    }
  };

  const closeNotification = () => {
    dispatch({ type: "CLOSE_NOTIFICATION" });
  };

  return (
    <>
      {state.isNotification && (
        <Notifications
          content={state.messageText}
          closeNotification={closeNotification}
        />
      )}
      <form className="form" onSubmit={submitHandler}>
        <label htmlFor="name">Name <span>*</span></label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          maxLength="15"
          placeholder="Enter the name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="age">Age <span>*</span></label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          min="1"
          max="120"
          placeholder="Enter the age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label htmlFor="courses">Courses <span>*</span></label>
        <select value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">Select your course</option>
          <option value="B.Sc">B.Sc</option>
          <option value="B.Com">B.Com</option>
          <option value="M.Sc">M.Sc</option>
          <option value="M.Com">M.Com</option>
        </select>
        <label htmlFor="gender">Gender </label>
        <label htmlFor="gender" className="gender-label">
          <input
            type="radio"
            className="radio-btn"
            id="gender"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          Male
        </label>
        <label htmlFor="gender" className="gender-label">
          <input
            type="radio"
            className="radio-btn"
            id="gender"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          Female
        </label>
        <label htmlFor="gender" className="gender-label">
          <input
            type="radio"
            className="radio-btn"
            id="gender"
            name="gender"
            value = ""
            checked={gender === ""}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          Prefer not to mention
        </label>
        <p>
        <input
          type="checkbox"
          title= "I agree the terms and condition for admission."
          className="checkBox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        Terms & Conditions. <span> *</span>
      </p>
        <button type="submit" title="click to submit" className="btn">
          Submit
        </button>
      </form>
      {state.students.map((student) => {
        return (
          <div className="single-student" key={student.id}>
            <div className="item">
              <h4>
                {student.name} ({student.age})
              </h4>
              <p>{student.gender}</p>
              <h3>{student.course}</h3>
            </div>
            <button
              type="button"
              className="dlt-btn"
              onClick={() => {
                dispatch({
                  type: "DELETE_USER",
                  load: student.id,
                });
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Form;
