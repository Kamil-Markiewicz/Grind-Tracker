import { Component, inject, signal } from '@angular/core';
import { LoggerService } from '../../services/LoggerService';
import { ThemeService } from '../../services/ThemeService';
import { Themes } from '../../../../shared/types/themes';

@Component({
    selector: 'settings-page',
    imports: [],
    templateUrl: './settings.html',
    styleUrl: './settings.scss',
})
export class Settings {
    private loggerService = inject(LoggerService);
    private themeService = inject(ThemeService);

    readonly themes = Object.values(Themes) as Themes[];

    async onThemeChange(theme: Themes) {
        this.themeService.switchTheme(theme);
    }
}
