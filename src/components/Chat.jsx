import React, { useContext } from "react";

import { ChatContext } from "../context/ChatContext";
import { Add, Cam, More } from "../img/";
import Input from "../components/Input";
import Messages from "../components/Messages";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <>
      {data.user.uid ? (
        <div className="chat">
          <div className="chat__info">
            <span>{data.user?.displayName}</span>
            <div className="chat__icons">
              <img src={Cam} alt="camera" />
              <img src={Add} alt="add" />
              <img src={More} alt="more" />
            </div>
          </div>
          <Messages />
          <Input />
        </div>
      ) : (
        <>
          <div className="chat">
            <div className="chat__info">
              <span>{data.user?.displayName}</span>
              <div className="chat__icons">
                <img src={Cam} alt="camera" />
                <img src={Add} alt="add" />
                <img src={More} alt="more" />
              </div>
            </div>
            <p className="please__select">Please select room!!!</p>
          </div>
        </>
      )}
    </>
  );
};

export default Chat;
