import { app, BrowserWindow, ipcMain, screen, dialog } from 'electron';
import * as url from 'node:url';
import * as path from 'node:path';
import system from './system';

let mainWindow: BrowserWindow | null = null;
const projectRoot = path.resolve(__dirname, '../../..');
const indexRelPath: string = "/dist/Grind-Tracker/browser/index.html";

function createWindow(): BrowserWindow {
    debugDisplay();
    // const win = new BrowserWindow({
    //     width: 800,
    //     height: 600,
    //     webPreferences: {
    //         preload: path.join(__dirname, 'src/backend/preload.js')
    //     }
    // })

    // win.loadFile(indexRelPath)

    const size = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    system.addHandlers(ipcMain);

    mainWindow.loadURL(
        url.format({
            pathname: path.join(projectRoot, indexRelPath),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    return mainWindow;
}

function debugDisplay() {
    console.log('__dirname:', __dirname);
    console.log('projectRoot:', path.resolve(__dirname, '../../..'));
}

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
        return filePaths[0]
    }
}

function handleSetDebug(event: any, debug: string) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    if (mainWindow) {
        mainWindow.setTitle(debug)
    }
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('dialog:openFile', handleFileOpen)
    ipcMain.on('set-debug', handleSetDebug)
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log("Closing application.")
        app.quit()
    }
})