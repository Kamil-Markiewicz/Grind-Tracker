import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ElectronService } from '../../services/electronService';
import { LoggerService } from '../../services/loggerService';
import {Home} from '../home/home'

@Component({
    selector: 'app-root',
    imports: [FormsModule, RouterOutlet, Home],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('Grind-Tracker');
    private electronService = inject(ElectronService);
    private loggerService = inject(LoggerService);

    protected debugStatus = '';
    private resultTest = '';

    async onSetDebug() {
        console.log('onSetDebug fired');//TODO Cleanup
        this.loggerService.logDebug('OnSetDebug entry');
        const res = await this.electronService.setDebug(this.debugStatus);
        if (res) this.resultTest = res;
    }
}
