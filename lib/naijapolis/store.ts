import { INITIAL_NAIJAPOLIS_STATE } from './data';
import type { NaijaPolisState } from './types';

const STORAGE_KEY = 'underdecanopy.naijapolis.demo.v2';

function cloneInitialState(): NaijaPolisState {
  return JSON.parse(JSON.stringify(INITIAL_NAIJAPOLIS_STATE)) as NaijaPolisState;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function getInitialNaijaPolisState() {
  return cloneInitialState();
}

export function loadNaijaPolisState(): NaijaPolisState {
  if (typeof window === 'undefined') return cloneInitialState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneInitialState();

    const parsed = JSON.parse(raw) as unknown;
    if (!isObject(parsed)) return cloneInitialState();

    const fallback = cloneInitialState();
    return {
      ...fallback,
      ...parsed,
      settings: {
        ...fallback.settings,
        ...(isObject(parsed.settings) ? parsed.settings : {}),
      },
    } as NaijaPolisState;
  } catch {
    return cloneInitialState();
  }
}

export function saveNaijaPolisState(state: NaijaPolisState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearNaijaPolisState() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
