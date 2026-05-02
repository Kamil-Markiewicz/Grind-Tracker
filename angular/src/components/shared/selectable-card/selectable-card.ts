import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'selectable-card',
    imports: [],
    standalone: true,
    templateUrl: './selectable-card.html',
    styleUrl: './selectable-card.scss',
})
export class SelectableCard<T> {
    @Input() title?: string;
    @Input() imagePath?: string;
    @Input() description?: string;
    @Input() value!: T;

    @Output() cardSelected = new EventEmitter<T>();

    onClick(): void {
        this.cardSelected.emit(this.value);
    }


}
