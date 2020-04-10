const { app, BrowserWindow , Menu} = require("electron");
const path = require('path')
const url = require('url')

function createWindow() {

  Menu.setApplicationMenu(null)           //windows下去掉菜单栏

  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    center: true,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  if(process.env.NODE_ENV === 'development'){
    win.loadURL("http://localhost:3000/")
  }
  else if(process.env.NODE_ENV === 'production'){
    win.loadURL(url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
  else{
    throw new Error("NODE_ENV is not found")
  }
  
  win.webContents.openDevTools ()
  
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
