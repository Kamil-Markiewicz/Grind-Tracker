import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './components/app/app.config';
import { App } from './components/app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

// if (window.electronAPI) {
//   window.electronAPI.system.setTitle('Custom App Title');
// }
