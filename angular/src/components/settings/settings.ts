import { Component, inject, signal } from '@angular/core';
import { LoggerService } from '../../services/LoggerService';
import { ThemeService } from '../../services/ThemeService';
import { Themes } from '../../../../shared/types/themes';
import { SelectableCard } from '../shared/selectable-card/selectable-card';
import { SelectableCardModel } from '../../models/selectable-card.model';

@Component({
    selector: 'settings-page',
    imports: [SelectableCard],
    templateUrl: './settings.html',
    styleUrl: './settings.scss',
})
export class Settings {
    private loggerService = inject(LoggerService);
    private themeService = inject(ThemeService);

    protected themeCards: SelectableCardModel<Themes>[] = [
        {
            title: 'Light Theme',
            value: Themes.Light,
        },
        {
            title: 'Dark Theme',
            value: Themes.Dark,
        },
        {
            title: 'Oled Theme',
            value: Themes.Oled,
        }
    ]

    async onThemeSelected(theme: Themes) {
        this.themeService.switchTheme(theme);
        console.log('Theme selected:', theme);
    }

}
