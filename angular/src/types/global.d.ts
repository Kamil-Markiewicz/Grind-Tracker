import { IElectronAPI } from './../api/electronApi';

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}