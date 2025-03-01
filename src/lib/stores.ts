import { writable, type Writable } from 'svelte/store';

export const eventStore = writable('');
export const validationStore: Writable<string[]> = writable([]);
