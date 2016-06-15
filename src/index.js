'use strict';
const electron = require('electron');
const app = electron.app;
const path = require("path");

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		minWidth: 400,
		minHeight: 230,
		width: 500,
		height: 300,
		center: true,
		resizable: true,
		fullscreenable:true,
		title:'Electron test',
		icon: '../images/icon.png',
		webPreferences:{
			nodeIntegration: false,
			preload: path.join(__dirname, 'preload.js')
		},
	});

	win.focus();
	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);


	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
