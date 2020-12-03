import { app, BrowserWindow, Menu, Tray, ipcMain } from 'electron';
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '\\keep.png'
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
function toogleWindo(window) {
  if (window.isVisible()){
    window.hide();
  }
  else {
    window.show();
  }
}
let tray = null
let notifyOptions = null;
let arg = null;
const WindowsToaster = require('node-notifier').WindowsToaster;
var notifier = new WindowsToaster({
      withFallback: false, // Fallback to Growl or Balloons?
      customPath: void 0 // Relative path if you want to use your fork of toast.exe
});
app.on('ready', () => {
  tray = new Tray( __dirname +'\\keep.png')
  const contextMenu = Menu.buildFromTemplate([
    /*{label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},*/
    {label: 'Exit', type: 'normal',click: () => {app.isQuiting = true;app.quit();}}
  ])
  tray.setToolTip('GTD 4 ME');
  tray.setContextMenu(contextMenu);
  tray.on("click",function(){toogleWindo(mainWindow);},false);
  ipcMain.on('asynchronous-message', function(event, arg) {
    notifier.notify({
      title: arg[0],
      message: arg[1].body,
      icon:  __dirname +'\\keep.png', // Absolute path to Icon
      sound: false, // true | false.
      wait: false, // Wait for User Action against Notification
  }, function(error, response) {
      console.log(response);
  });
});

mainWindow.on('close', function (event) {
    if(!app.isQuiting){
        event.preventDefault();
        mainWindow.hide();
    }
    return false;
});
})
