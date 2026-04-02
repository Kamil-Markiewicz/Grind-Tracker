import { IElectronAPI } from './../api/electronApi';

export {};

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}