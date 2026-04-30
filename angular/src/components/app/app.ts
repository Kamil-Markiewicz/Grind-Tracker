import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ElectronService } from '../../services/ElectronService';
import { LoggerService } from '../../services/LoggerService';
import {Home} from '../home/home'
import { ThemeService } from '../../services/ThemeService';
import { Themes } from '../../../../shared/types/themes';

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
    private themeService = inject(ThemeService);

    protected debugStatus = '';
    private resultTest = '';

    readonly themes = Object.values(Themes) as Themes[];

    async onSetDebug() {
        console.log('onSetDebug fired');//TODO Cleanup
        this.loggerService.logDebug('OnSetDebug entry');
        const res = await this.electronService.setDebug(this.debugStatus);
        if (res) this.resultTest = res;
    }

    async onThemeChange(theme: Themes) {
        this.themeService.switchTheme(theme);
    }
}
