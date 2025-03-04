import { writable, type Writable } from 'svelte/store';
import type { Game } from './models/game';

export const eventStore = writable('');
export const validationStore: Writable<string[]> = writable([]);
export const draftGameStore: Writable<Game | undefined> = writable();