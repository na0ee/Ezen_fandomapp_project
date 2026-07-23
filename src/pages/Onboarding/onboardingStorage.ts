const ONBOARDING_COMPLETED_KEY = "layer-onboarding-completed";
const ONBOARDING_SELECTIONS_KEY = "layer-onboarding-selections";

export type OnboardingSelections = {
  perfumeCount?: string;
  moment?: string;
  moments?: string[];
  scent?: string;
  scents?: string[];
  mood?: string;
  method?: string;
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

export function saveOnboardingSelection<Key extends keyof OnboardingSelections>(
  key: Key,
  value: OnboardingSelections[Key] | null,
) {
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

export function getOnboardingDiagnosis() {
  const selections = getOnboardingSelections();

  return {
    q1: selections.perfumeCount,
    q2: selections.moments ?? (selections.moment ? [selections.moment] : []),
    q3: selections.scents ?? (selections.scent ? [selections.scent] : []),
    q4: selections.mood,
    q5: selections.method,
  };
}
