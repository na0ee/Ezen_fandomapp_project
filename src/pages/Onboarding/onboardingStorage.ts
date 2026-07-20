const ONBOARDING_COMPLETED_KEY = "layer-onboarding-completed";

export function hasCompletedOnboarding() {
  return window.localStorage.getItem(ONBOARDING_COMPLETED_KEY) === "true";
}

export function completeOnboarding() {
  window.localStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
}
