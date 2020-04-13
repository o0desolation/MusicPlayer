const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const url = require("url");

function createWindow() {
  // Menu.setApplicationMenu(null)           //windows下去掉菜单栏
  const win = new BrowserWindow({
    width: 1020,
    minWidth: 1020,
    height: 680,
    minHeight: 680,
    center: true,
    frame: false,
    experimentalFeatures: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:3000/");
    win.webContents.openDevTools();
  } else if (process.env.NODE_ENV === "production") {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "./build/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  } else {
    throw new Error("NODE_ENV is not found");
  }
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
