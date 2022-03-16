import { writable } from 'svelte/store';
export const jwt = writable('test');
export const BACKEND_SERVER = "http://localhost:4000/api/v1"