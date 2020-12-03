/*const {ipcRenderer} = require('electron')
window.Notification = function(title,ops){
var notCont = [title,ops];
ipcRenderer.sendToHost('asynchronous-message',notCont);
};*/
const WindowsToaster = require('node-notifier').WindowsToaster;
var notifier = new WindowsToaster({
      withFallback: false, // Fallback to Growl or Balloons?
      customPath: void 0 // Relative path if you want to use your fork of toast.exe
});
window.Notification = function(title,ops){
alert(ops);
alert(title);
var arg = [title,ops];
	notifier.notify({
      title: arg[0],
      message: arg[1].body,
      icon:  __dirname +'\\keep.png', // Absolute path to Icon
      sound: false, // true | false.
      wait: false, // Wait for User Action against Notification
  }, function(error, response) {
      console.log(response);
  });
}
