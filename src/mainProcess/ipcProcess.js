const { ipcMain } = require("electron");

const ipc = (win) => {
  ipcMain.on("minimize", () => {
    win.minimize();
  });
  ipcMain.on("isMaximized",(event,arg) => {
    if(win.isMaximized())
      event.returnValue = true
    else
      event.returnValue = false
  })
  ipcMain.on("maximize", () => {
    win.maximize();
  });
  ipcMain.on("unmaximize",() => {
    win.unmaximize();
  })
  ipcMain.on("close", () => {
    win.close();
  });
};
module.exports = ipc;
