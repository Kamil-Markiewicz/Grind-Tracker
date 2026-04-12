import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ElectronService } from '../../services/electronService';
import { LoggerService } from '../../services/loggerService';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home {
    //private electronService = inject(ElectronService);
    private loggerService = inject(LoggerService);
}
