import { app, BrowserWindow } from 'electron';

function handleRestartApp() {
    app.relaunch();
    app.quit();
}

async function handleSetDebug(event: any, debug: string) {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    if(win != null){
        win.setTitle(debug);
    }
    else {
        console.log("Window is null")
    }
    return debug;
}

export default {
    addHandlers: (ipcMain:any) => {
        ipcMain.handle('system:restartApp', handleRestartApp);
        ipcMain.handle('system:setDebug', handleSetDebug);
    },
};

export {}; // Forces TypeScript to treat this as a module