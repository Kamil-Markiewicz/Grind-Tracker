import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private dark = signal(false);
  isDark = this.dark.asReadonly();

  toggle() {
    this.dark.update(b => !b);
    document.documentElement.setAttribute(
      'data-bs-theme', this.dark() ? 'dark' : 'light'
    );
    console.log("Toggled theme");
  }
}