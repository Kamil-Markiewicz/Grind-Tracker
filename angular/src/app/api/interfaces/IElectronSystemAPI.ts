export interface IElectronSystemAPI {
  // Core
  restartApp(): void;

  // General Purpose
  setTitle(title: string): Promise<void>;
}

export {}; // Forces this file to be treated as a module