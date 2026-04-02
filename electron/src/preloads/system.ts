import { ipcRenderer } from 'electron';

// Core
export function restartApp() {
    ipcRenderer.invoke('system:restartApp');
}

// General Purpose
export function setDebug(debug:string) {
    ipcRenderer.invoke('system:setDebug', debug);
}