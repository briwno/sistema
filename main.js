// main.js

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const reload = require('electron-reload');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'icone.ico')

  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // Remover a barra de menu
  Menu.setApplicationMenu(null);
}


app.on('ready', () => {
  createWindow();

  // Configurar o electron-reload para monitorar os arquivos no diretório do projeto
  reload(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
