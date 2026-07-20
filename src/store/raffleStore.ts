import { useSyncExternalStore } from "react";

let appliedRaffleIds: ReadonlySet<string> = new Set();
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function applyRaffle(id: string) {
  if (!appliedRaffleIds.has(id)) {
    appliedRaffleIds = new Set(appliedRaffleIds).add(id);
    emitChange();
  }
}

export function useRaffleApplied(id: string | undefined) {
  return useSyncExternalStore(subscribe, () => (id ? appliedRaffleIds.has(id) : false));
}

export function useAppliedRaffleIds() {
  return useSyncExternalStore(subscribe, () => appliedRaffleIds);
}
