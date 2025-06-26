import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { boardReducer } from './store/board-reducer';
import { localStorageMetaReducer } from './store/local-storage.meta-reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideStore(
            { board: boardReducer },
            {
                metaReducers: [localStorageMetaReducer],
                runtimeChecks: {
                    strictStateImmutability: true,
                    strictActionImmutability: true,
                },
            },
        ),
    ],
};
