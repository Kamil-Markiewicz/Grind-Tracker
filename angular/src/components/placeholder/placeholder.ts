import { Component, signal } from '@angular/core';

@Component({
    selector: 'placeholder',
    imports: [],
    templateUrl: './placeholder.html',
    styleUrl: './placeholder.scss',
})
export class Placeholder {
    protected readonly title = signal('Grind-Tracker');
}
