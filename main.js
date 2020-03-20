const { app, BrowserWindow } = require("electron");
const ipcProcess = require("./src/mainProcess/ipcProcess");   //1.导入自建的进程通信模块
require("electron-reload")(__dirname);    //2.导入electron-reload模块实现热加载

function createWindow() {

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,   //3.取消窗口边框，这样会得到一个空白窗口
    webPreferences: {
      nodeIntegration: true
    }
  });
 
  win.center()
  win.loadURL("http://localhost:3000/");

  ipcProcess(win);    //4.调用进程通信模块，参数为window对象
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
