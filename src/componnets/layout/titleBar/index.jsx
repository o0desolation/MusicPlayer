import React, { useState, useEffect } from "react";
import "./index.css";
import Minimize from "react-icons/lib/md/remove";
import Maximize from "react-icons/lib/md/crop-square";
import Close from "react-icons/lib/md/close";
import UnMaximize from "react-icons/lib/md/filter-none";
import Config from "react-icons/lib/md/settings";
import Play from "react-icons/lib/md/toys";
import SearchBox from "../../searchBox/index";
import ToggleButton from '../../toggleButton/index';
const electron = window.require("electron");
const remote = electron.remote;

const CustomTitleBar = (props) => {
  const window = remote.getCurrentWindow();
  const [isMaximized, setIsMaximized] = useState(window.isMaximized());

  const hoverStyle = {
    baseColor: "#e4f9f5",
    commonColor: "#30e3ca",
    closeColor: "#fa163f",
    fontColor: "#40514e",
    closeFontColor: "#fff",
    
  };

  const mainProcessListner = () => {
    window.on("maximize", () => {
      setIsMaximized(true);
      let maxBtn = document.querySelector(".maxBtn");
      maxBtn.style.backgroundColor = hoverStyle.baseColor;
    });

    window.on("unmaximize", () => {
      setIsMaximized(false);
      let maxBtn = document.querySelector(".maxBtn");
      maxBtn.style.backgroundColor = hoverStyle.baseColor;
    });

    window.on("restore", () => {
      let minbtn = document.querySelector(".minBtn");
      minbtn.style.backgroundColor = hoverStyle.baseColor;
    });
  };

  useEffect(() => {
    mainProcessListner();
  });

  const minHandler = () => {
    window.minimize();
  };

  const maxHandler = () => {
    if (window.isMaximized()) {
      window.unmaximize();
      setIsMaximized(false);
    } else {
      window.maximize();
      setIsMaximized(true);
    }
  };

  const closeHandler = () => {
    window.close();
  };

  const hover = (e) => {
    let el = e.currentTarget;
    if(el.className === "config"){
      el.style.color = hoverStyle.closeFontColor;
    }
    else if (el.className === "closeBtn") {
      el.style.backgroundColor = hoverStyle.closeColor;
      el.style.color = hoverStyle.closeFontColor;
    } else el.style.backgroundColor = hoverStyle.commonColor;
  };

  const hoverCancle = (e) => {
    e.currentTarget.style.backgroundColor = hoverStyle.baseColor;
    e.currentTarget.style.color = hoverStyle.fontColor;
  };

  return (
    <div className="mainBar">
      <SearchBox/>
      <ToggleButton/>
      <section className="windowBtns">
        <button
          className="config"
          onMouseOver={hover}
          onMouseLeave={hoverCancle}
          style={{ fontSize: "20px" }}
        >
          <Config />
        </button>

        <button
          className="minBtn"
          onClick={minHandler}
          onMouseOver={hover}
          onMouseLeave={hoverCancle}
          style={{ fontSize: "20px" }}
        >
          <Minimize />
        </button>
        <button
          className="maxBtn"
          onClick={maxHandler}
          onMouseOver={hover}
          onMouseLeave={hoverCancle}
        >
          {isMaximized ? (
            <UnMaximize style={{ fontSize: "14px" }} />
          ) : (
            <Maximize style={{ fontSize: "18px" }} />
          )}
        </button>
        <button
          className="closeBtn"
          onClick={closeHandler}
          onMouseOver={hover}
          onMouseOut={hoverCancle}
          style={{ fontSize: "20px" }}
        >
          <Close />
        </button>
      </section>
    </div>
  );
};
export default CustomTitleBar;
