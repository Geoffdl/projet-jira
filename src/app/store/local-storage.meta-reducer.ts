import { ActionReducer, Action } from '@ngrx/store';
import { BoardState } from './board.state';

export interface AppState {
    board: BoardState;
}

const LOCAL_STORAGE_KEY = 'jira-app-state';

// Helper functions for localStorage operations
const loadStateFromLocalStorage = (): Partial<AppState> | undefined => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        const parsedState = JSON.parse(serializedState);

        // Validate the loaded state structure
        if (parsedState && typeof parsedState === 'object' && parsedState.board) {
            return parsedState;
        }

        console.warn('Invalid state structure in localStorage, using default state');
        return undefined;
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        return undefined;
    }
};

const saveStateToLocalStorage = (state: AppState): void => {
    try {
        // Only save essential data to avoid localStorage size limits
        const stateToSave = {
            board: {
                boards: state.board.boards,
            },
        };

        const serializedState = JSON.stringify(stateToSave);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
        // Handle quota exceeded error
        if (error instanceof DOMException && error.code === 22) {
            console.warn('localStorage quota exceeded. Consider implementing state cleanup.');
        }
    }
};

// Debounce function to limit save frequency
let saveTimeout: number | null = null;
const debouncedSave = (state: AppState): void => {
    if (saveTimeout) {
        clearTimeout(saveTimeout);
    }

    saveTimeout = setTimeout(() => {
        saveStateToLocalStorage(state);
        saveTimeout = null;
    }, 500); // Save after 500ms of inactivity
};

export function localStorageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>): ActionReducer<S, A> {
    return function (state: S | undefined, action: A): S {
        // Handle the INIT action to load initial state
        if (action.type === '@ngrx/store/init') {
            const loadedState = loadStateFromLocalStorage();
            if (loadedState) {
                return { ...reducer(state, action), ...loadedState } as S;
            }
        }

        // Get the new state after applying the action
        const newState = reducer(state, action);

        // Save to localStorage (with debouncing)
        if (action.type !== '@ngrx/store/init') {
            debouncedSave(newState as AppState);
        }

        return newState;
    };
}

// Utility function to clear localStorage (useful for logout/reset)
export const clearPersistedState = (): void => {
    try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        console.info('Persisted state cleared from localStorage');
    } catch (error) {
        console.error('Error clearing persisted state:', error);
    }
};

// Utility function to export current state (for backup/import features)
export const exportState = (): string | null => {
    try {
        return localStorage.getItem(LOCAL_STORAGE_KEY);
    } catch (error) {
        console.error('Error exporting state:', error);
        return null;
    }
};

// Utility function to import state (for backup/import features)
export const importState = (stateJson: string): boolean => {
    try {
        const state = JSON.parse(stateJson);
        localStorage.setItem(LOCAL_STORAGE_KEY, stateJson);
        console.info('State imported successfully');
        return true;
    } catch (error) {
        console.error('Error importing state:', error);
        return false;
    }
};
