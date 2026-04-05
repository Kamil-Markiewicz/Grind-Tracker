import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {

    logDebug(message: string) {
        console.log('DEBUG: ' + message);
    }
}