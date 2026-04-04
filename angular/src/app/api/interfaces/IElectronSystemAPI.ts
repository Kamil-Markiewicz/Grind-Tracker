export interface IElectronSystemAPI {
    // Core
    restartApp(): void;

    // General Purpose
    setDebug(title: string): Promise<string>;
}