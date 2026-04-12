import { contextBridge, ipcRenderer } from 'electron';
import * as system from './preloads/system';

contextBridge.exposeInMainWorld('electronAPI', {
    system,
});

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
    // we can also expose variables, not just functions
});

// contextBridge.exposeInMainWorld('electronAPI', {
//     openFile: () => ipcRenderer.invoke('dialog:openFile'),
//     setDebug: (debug) => ipcRenderer.send('set-debug', debug)
// })