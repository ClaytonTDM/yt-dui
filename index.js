const { app, BrowserWindow } = require('electron')
const path = require('path');
const { enable, initialize } = require('@electron/remote/main')
initialize()
function createWindow () {
  const win = new BrowserWindow({
    width: 490,
    height: 510,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')

  enable(win.webContents)

  win.setMenuBarVisibility(false);
}

app.commandLine.appendSwitch('enable-features', 'FluentScrollbar');
app.whenReady().then(createWindow)

ipcMain.on('getFullPath', (event, relativePath) => {
    const fullPath = path.resolve(__dirname, relativePath);
    event.reply('gotFullPath', fullPath);
});