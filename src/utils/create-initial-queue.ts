import { profiles } from "@/data/profiles";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function createInitialQueue(): number[] {
  const indices = shuffle(profiles.map((_, index) => index));

  const matched = indices.filter((i) => profiles[i].match === true);
  const unmatched = indices.filter((i) => profiles[i].match !== true);

  const gapCount = matched.length + 1;
  const gaps = Array(gapCount).fill(
    Math.floor(unmatched.length / gapCount),
  ) as number[];

  const remainder = unmatched.length % gapCount;
  const gapOrder = shuffle(Array.from({ length: gapCount }, (_, i) => i));

  for (let i = 0; i < remainder; i++) {
    gaps[gapOrder[i]]++;
  }

  const queue: number[] = [];
  let unmatchedIndex = 0;

  for (let i = 0; i < gapCount; i++) {
    queue.push(...unmatched.slice(unmatchedIndex, unmatchedIndex + gaps[i]));

    unmatchedIndex += gaps[i];

    if (i < matched.length) {
      queue.push(matched[i]);
    }
  }

  return queue;
}
