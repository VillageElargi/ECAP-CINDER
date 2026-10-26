import { profiles } from "@/data/profiles";
import * as Updates from "expo-updates";
import { useCallback, useState } from "react";
import { MAX_ERRORS, SWIPES_BEFORE_MATCH } from "../constants/swiper-config";
import { createInitialQueue } from "../utils/create-initial-queue";

type PendingMatch = {
  id: number;
  unlockAt: number;
};

export function useSwiperGame() {
  const [queue, setQueue] = useState<number[]>(createInitialQueue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seenCount, setSeenCount] = useState(0);
  const [errors, setErrors] = useState(0);

  const [warning, setWarning] = useState(false);
  const [warningSendet, setWarningSendet] = useState(false);

  const [isMatchViewer, setIsMatchViewer] = useState(false);
  const [pendingMatches, setPendingMatches] = useState<PendingMatch[]>([]);
  const [unlockedMatches, setUnlockedMatches] = useState<number[]>([]);
  const [matchQueue, setMatchQueue] = useState<number[]>([]);

  const currentProfile =
    currentIndex < queue.length ? profiles[queue[currentIndex]] : undefined;

  const activeMatch = profiles.find((profile) => profile.id === matchQueue[0]);

  const isFinished = currentIndex >= queue.length;

  const resetGame = useCallback(async () => {
    setQueue(createInitialQueue());
    setCurrentIndex(0);
    setSeenCount(0);
    setErrors(0);
    setWarning(false);
    setPendingMatches([]);
    setUnlockedMatches([]);
    setMatchQueue([]);
    setIsMatchViewer(false);
    await Updates.reloadAsync();
  }, []);

  const nextProfile = useCallback(
    (direction: "left" | "right") => {
      const profile = currentProfile;

      if (!profile) return;

      const profileIndex = queue[currentIndex];
      const isCorrect = direction === profile.should;

      const nextSeenCount = seenCount + 1;
      const nextErrors = errors + (isCorrect ? 0 : 1);

      if (nextErrors == MAX_ERRORS - 1 && !warningSendet) {
        setWarning(true);
        setWarningSendet(true);
      }

      if (nextErrors > MAX_ERRORS) {
        resetGame();
        return;
      }

      const nextQueue = isCorrect ? queue : [...queue, profileIndex];

      setQueue(nextQueue);
      setCurrentIndex((prev) => prev + 1);
      setSeenCount(nextSeenCount);
      setErrors(nextErrors);

      let pending = [...pendingMatches];
      let unlocked = [...unlockedMatches];
      let queued = [...matchQueue];

      if (
        isCorrect &&
        profile.match === true &&
        !unlocked.includes(profile.id) &&
        !pending.some((item) => item.id === profile.id)
      ) {
        pending.push({
          id: profile.id,
          unlockAt: nextSeenCount + SWIPES_BEFORE_MATCH,
        });
      }

      // Débloque les matchs arrivés à échéance.
      const ready = pending.filter((item) => nextSeenCount >= item.unlockAt);

      const readyIds = ready
        .map((item) => item.id)
        .filter((id) => !unlocked.includes(id));

      unlocked = [...unlocked, ...readyIds];
      queued = [...queued, ...readyIds.filter((id) => !queued.includes(id))];

      pending = pending.filter((item) => nextSeenCount < item.unlockAt);

      // Ne laisse pas de matchs en attente à la fin de la file.
      const reachedEnd = currentIndex + 1 >= nextQueue.length;

      if (reachedEnd && pending.length > 0) {
        const remainingIds = pending
          .map((item) => item.id)
          .filter((id) => !unlocked.includes(id));

        unlocked = [...unlocked, ...remainingIds];
        queued = [
          ...queued,
          ...remainingIds.filter((id) => !queued.includes(id)),
        ];

        pending = [];
      }

      setPendingMatches(pending);
      setUnlockedMatches(unlocked);
      setMatchQueue(queued);
    },
    [
      currentProfile,
      queue,
      currentIndex,
      seenCount,
      errors,
      pendingMatches,
      unlockedMatches,
      matchQueue,
      resetGame,
    ],
  );

  const closeMatch = useCallback(() => {
    setMatchQueue((prev) => prev.slice(1));
  }, []);

  const openMatchViewer = useCallback(() => {
    setIsMatchViewer(true);
  }, []);

  const closeMatchViewer = useCallback(() => {
    setIsMatchViewer(false);
  }, []);

  const openMatchesAndCloseModal = useCallback(() => {
    setIsMatchViewer(true);
    closeMatch();
  }, [closeMatch]);

  return {
    queue,
    currentIndex,
    currentProfile,
    isFinished,
    isMatchViewer,
    setIsMatchViewer,
    activeMatch,
    matchQueue,
    pendingMatches,
    unlockedMatches,
    errors,
    seenCount,
    matchsTotal: profiles.filter((profile) => profile.match === true).length,
    nextProfile,
    resetGame,
    closeMatch,
    openMatchViewer,
    closeMatchViewer,
    openMatchesAndCloseModal,
    warning,
    setWarning,
  };
}
