import { Injectable, signal } from "@angular/core";
import { Themes } from "../../../shared/types/themes";

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private theme = signal<Themes>(Themes.Light);
    currentTheme = this.theme.asReadonly();
    
    switchTheme(theme: Themes) {
        document.documentElement.setAttribute(
            'data-bs-theme', theme
        );
    }
}