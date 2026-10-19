import { PROFILE_IMAGES } from "../constants/profile-images";

type ProfileImageData = {
  image?: unknown;
  imageKey?: unknown;
  imageId?: unknown;
  img?: unknown;
  picture?: unknown;
};

export function getProfileImageKey(profile: unknown): string | undefined {
  if (!profile || typeof profile !== "object") {
    return undefined;
  }

  const data = profile as ProfileImageData;

  const candidate =
    data.imageKey ?? data.imageId ?? data.image ?? data.img ?? data.picture;

  if (typeof candidate === "string" && candidate in PROFILE_IMAGES) {
    return candidate;
  }

  return undefined;
}

export function getProfileImageSource(profile: unknown): number | undefined {
  const key = getProfileImageKey(profile);

  return key ? PROFILE_IMAGES[key] : undefined;
}
