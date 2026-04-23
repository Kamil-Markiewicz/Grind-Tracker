import { Injectable } from '@angular/core';
import type { IElectronAPI } from '../api/electronAPI';

@Injectable({ providedIn: 'root' })
export class ElectronService {

    private get api(): IElectronAPI | undefined {
        return window.electronAPI ?? undefined;
    }

    get isElectron(): boolean {
        return !!this.api;
    }

    // System
    restartApp(): void {
        this.api?.system.restartApp();
    }

    setDebug(debug: string): Promise<string> | void {
        console.log("Service setDebug log: " + debug); //TODO cleanup
        return this.api?.system.setDebug(debug);
    }
}