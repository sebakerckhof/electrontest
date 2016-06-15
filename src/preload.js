// Local variables will not escape the preload script.
const path = require("path");
const drivelist = require('./drivelist/build/drivelist');

// Or in the renderer process.
const BrowserWindow = require('electron').remote.BrowserWindow;

// Global variables _will_ escape the preload script, except for globals injected by Node,
// like `require`—-those will be deleted after the script is done executing.
TEST = {
	drivelist,
	open: url => {
		//window.open(url)
		const win = new BrowserWindow({
			minWidth: 1000,
			minHeight: 600,
			width: 1200,
			height: 768,
			center: true,
			resizable: true,
			fullscreenable: true,
			title: 'Barco Pairing Tool',
			icon: '../images/icon.png',
			webPreferences: {
				nodeIntegration: false,
				preload: path.join(__dirname, 'preload.js')
			},
		});

		win.focus();


		url = url.trim();
		if(url[url.length-1] !== '/') url += '/';

		if(!/^http(s?):\/\//.test(url)){
			url = 'http://' + url;
		}

		win.loadURL(url);

		const webContents = win.webContents;

		webContents.on('did-fail-load',(event,code,description,validatedURL) => {
			//Error code meaning can be found: https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h
			webContents.executeJavaScript(`alert('Error loading page. Error code ${code}. Please verify the entered server url and your network connection');`);
		});

		webContents.on('crashed',() => {
			webContents.executeJavaScript(`alert('Target crashed, please try again.');`);
		});
	}

};
