import { Component, signal } from '@angular/core';
import { SelectableCard } from '../shared/selectable-card/selectable-card';
import { SelectableCardModel } from '../../models/selectable-card.model';

@Component({
    selector: 'placeholder',
    imports: [SelectableCard],
    templateUrl: './placeholder.html',
    styleUrl: './placeholder.scss',
})
export class Placeholder {
    protected readonly title = signal('Grind-Tracker');
    readonly cards: SelectableCardModel<unknown>[] = [
        {
            title: 'Option A',
            imagePath: 'https://picsum.photos/seed/a/300/120',
            description: 'A card with all fields populated.',
            value: { id: 1, code: 'A' },
        },
        {
            title: 'Option B',
            description: 'A card without an image.',
            value: 'option-b',
        },
        {
            imagePath: 'https://picsum.photos/seed/c/300/120',
            description: 'A card without a title.',
            value: 42,
        },
        {
            title: 'Option D',
            value: true,
        },
    ];

    onCardSelected(value: unknown): void {
        console.log('Card selected:', value);
    }
}
