const { app, BrowserWindow } = require("electron");
require("electron-reload")(__dirname);    //导入electron-reload模块实现热加载

function createWindow() {

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
 
  win.center()
  win.loadURL("http://localhost:3000/");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
