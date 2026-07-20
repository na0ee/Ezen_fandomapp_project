const ONBOARDING_COMPLETED_KEY = "layer-onboarding-completed";
const ONBOARDING_SELECTIONS_KEY = "layer-onboarding-selections";

export type OnboardingSelections = {
  moment?: string;
  scent?: string;
  mood?: string;
};

export function hasCompletedOnboarding() {
  return window.localStorage.getItem(ONBOARDING_COMPLETED_KEY) === "true";
}

export function completeOnboarding() {
  window.localStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
}

export function getOnboardingSelections(): OnboardingSelections {
  try {
    const storedSelections = window.localStorage.getItem(ONBOARDING_SELECTIONS_KEY);

    return storedSelections ? (JSON.parse(storedSelections) as OnboardingSelections) : {};
  } catch {
    return {};
  }
}

export function saveOnboardingSelection(key: keyof OnboardingSelections, value: string) {
  const currentSelections = getOnboardingSelections();

  window.localStorage.setItem(
    ONBOARDING_SELECTIONS_KEY,
    JSON.stringify({ ...currentSelections, [key]: value }),
  );
}
