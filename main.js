const { app, BrowserWindow, dialog, ipcMain } = require('electron')

const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src/backend/preload.js')
        }
    })

    win.loadFile('src/frontend/index.html')
}

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
        return filePaths[0]
    }
}

function handleSetDebug(event, debug) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(debug)
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