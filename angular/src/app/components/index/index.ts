import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ElectronService } from '../../services/electronService';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-index',
    imports: [FormsModule],
    templateUrl: './index.html',
    styleUrl: './index.scss',
})
export class AppIndex {
    private electronService = inject(ElectronService);

    debugStatus = '';
    result = '';

    async onSetDebug() {
        const res = await this.electronService.setDebug(this.debugStatus);
        if (res) this.result = res;
    }
}
