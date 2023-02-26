import React, { useEffect } from "react";

const Notifications = ({ content, closeNotification }) => {
  useEffect(() => {
    setTimeout(() => {
      closeNotification();
    }, 4000);
  });
  return (
    <div className="notification">
      <p>{content}</p>
    </div>
  );
};
export default Notifications;
