import { Injectable } from '@angular/core';
import { clearPersistedState, exportState, importState } from '../../app/store/local-storage.meta-reducer';

@Injectable({
    providedIn: 'root',
})
/**
 * Implementation of local storage manager
 */
export class StorageService {
    /**
     * Clear all persisted state from localStorage
     * Useful for reset/logout functionality
     */
    clearAll(): void {
        clearPersistedState();
    }

    /**
     * Export current state as JSON string
     * Useful for backup functionality
     */
    exportData(): string | null {
        return exportState();
    }

    /**
     * Import state from JSON string
     * Useful for restore functionality
     * @param stateJson - JSON string containing the state to import
     * @returns true if import was successful, false otherwise
     */
    importData(stateJson: string): boolean {
        return importState(stateJson);
    }

    /**
     * Download current state as a JSON file
     * Convenient backup method
     */
    downloadBackup(): void {
        const stateJson = this.exportData();
        if (!stateJson) {
            console.error('No state to export');
            return;
        }

        const blob = new Blob([stateJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `jira-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /**
     * Check if localStorage is available
     * Useful for SSR environments
     */
    isStorageAvailable(): boolean {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get storage usage information
     * Helpful for debugging storage issues
     */
    getStorageInfo(): { used: number; available: number; percentage: number } {
        if (!this.isStorageAvailable()) {
            return { used: 0, available: 0, percentage: 0 };
        }

        try {
            const totalSize = 5 * 1024 * 1024; // 5MB typical localStorage limit
            let usedSize = 0;

            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    usedSize += localStorage[key].length + key.length;
                }
            }

            return {
                used: usedSize,
                available: totalSize - usedSize,
                percentage: Math.round((usedSize / totalSize) * 100),
            };
        } catch (error) {
            console.error('Error calculating storage info:', error);
            return { used: 0, available: 0, percentage: 0 };
        }
    }
}
