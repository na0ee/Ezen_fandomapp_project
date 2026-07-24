export const CHALLENGE_REWARD_STORAGE_KEY = "layer:pendingChallengeReward";
export const CHALLENGE_LIST_PATH = "/event/challenges";

export type PendingChallengeReward = {
  message: string;
  title: string;
};

function extractPoints(description: string): number | null {
  const matches = [...description.matchAll(/(\d+)p/g)].map((match) =>
    Number(match[1]),
  );

  if (matches.length === 0) {
    return null;
  }

  return Math.max(...matches);
}

export function buildRewardMessage(title: string, description: string): string {
  const points = extractPoints(description);

  return points
    ? `${title} 참여로 ${points}p가 적립되었습니다!`
    : `${title} 참여로 포인트가 적립되었습니다!`;
}

export function buildRewardPayload(title: string, description: string): string {
  return JSON.stringify({
    message: buildRewardMessage(title, description),
    title,
  });
}

export function setPendingChallengeReward(title: string, description: string) {
  sessionStorage.setItem(
    CHALLENGE_REWARD_STORAGE_KEY,
    buildRewardPayload(title, description),
  );
}

export function getPendingChallengeReward(): PendingChallengeReward | null {
  const stored = sessionStorage.getItem(CHALLENGE_REWARD_STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    const reward = JSON.parse(stored) as PendingChallengeReward;

    return reward.message ? reward : { message: stored, title: reward.title };
  } catch {
    return { message: stored, title: "" };
  }
}
