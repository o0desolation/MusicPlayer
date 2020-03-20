import React, { useState, useEffect } from "react";
import "./index.css";
import Minimize from "react-icons/lib/md/remove";
import Maximize from "react-icons/lib/md/crop-square";
import Close from "react-icons/lib/md/close";
import UnMaximize from "react-icons/lib/md/filter-none";
const electron = window.require("electron");

const WindowTop = () => {
  const [isMaximized, setIsMaximized] = useState(null);

  const mainProcessListner = () => {
    electron.ipcRenderer.on("maximized", () => {
      setIsMaximized(true);
    });

    electron.ipcRenderer.on("unmaximized", () => {
      setIsMaximized(false);
    });
  };

  useEffect(() => {
    setIsMaximized(electron.ipcRenderer.send("isMaximized"));
    mainProcessListner();
  }, []);

  const minHandler = () => {
    electron.ipcRenderer.send("minimize");
  };
  const maxHandler = () => {
    if (!isMaximized) {
      electron.ipcRenderer.send("maximize");
      setIsMaximized(true);
    } else {
      electron.ipcRenderer.send("unmaximize");
      setIsMaximized(false);
    }
  };
  const closeHandler = () => {
    electron.ipcRenderer.send("close");
  };
  return (
    <div className="top">
      <button onClick={minHandler}>
        <Minimize />
      </button>
      <button onClick={maxHandler}>
        {isMaximized ? <UnMaximize /> : <Maximize />}
      </button>
      <button onClick={closeHandler}>
        <Close />
      </button>
    </div>
  );
};

export default WindowTop;
