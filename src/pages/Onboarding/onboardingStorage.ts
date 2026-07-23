const ONBOARDING_COMPLETED_KEY = "layer-onboarding-completed";
const ONBOARDING_SELECTIONS_KEY = "layer-onboarding-selections";

export type OnboardingSelections = {
  moment?: string;
  scent?: string;
  mood?: string;
};

export function hasCompletedOnboarding() {
  return (
    window.localStorage.getItem(ONBOARDING_COMPLETED_KEY) === "true" ||
    window.localStorage.getItem(ONBOARDING_SELECTIONS_KEY) !== null
  );
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

export function saveOnboardingSelection(key: keyof OnboardingSelections, value: string | null) {
  const currentSelections = getOnboardingSelections();

  if (value === null) {
    delete currentSelections[key];
  } else {
    currentSelections[key] = value;
  }

  window.localStorage.setItem(
    ONBOARDING_SELECTIONS_KEY,
    JSON.stringify(currentSelections),
  );
}
