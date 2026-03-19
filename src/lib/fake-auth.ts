export const FAKE_AUTH_STORAGE_KEY = "wavespeed_fake_auth";
export const FAKE_AUTH_PROVIDER_STORAGE_KEY = "wavespeed_fake_auth_provider";

export type FakeAuthProvider = "google" | "github";

export const isFakeSignedIn = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(FAKE_AUTH_STORAGE_KEY) === "1";
};

export const setFakeSignedIn = (provider: FakeAuthProvider) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(FAKE_AUTH_STORAGE_KEY, "1");
  window.localStorage.setItem(FAKE_AUTH_PROVIDER_STORAGE_KEY, provider);
};

export const clearFakeSignedIn = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(FAKE_AUTH_STORAGE_KEY);
  window.localStorage.removeItem(FAKE_AUTH_PROVIDER_STORAGE_KEY);
};
