import { createContext, use } from "react";

import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import { User } from "@/drizzle/schema";

type ProfileState = {
  firstName: string | null;
  lastName: string | null;
  email: string;
  username: string;
  croppedAvatar: Blob | null;
  savedAvatarUrl: string | null; // Add this to track the last saved avatar URL
  isDirty: boolean;
  errors: Record<string, string[]> | undefined;
};

type ProfileDataFromDb = {
  firstName: string | null;
  lastName: string | null;
  email: string;
  username: string;
  avatarUrl: string | null;
};

type ProfileAction = {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  setField: (field: keyof Omit<ProfileState, "isDirty">, value: any) => void;
  // eslint-disable-next-line no-unused-vars
  setErrors: (errors: Record<string, string[]> | undefined) => void;
  // eslint-disable-next-line no-unused-vars
  resetFromDb: (profileDataFromDb: ProfileDataFromDb) => void;
  clearCroppedAvatar: () => void;
  recomputeIsDirty: () => void;
};

type ProfileStore = ProfileState & ProfileAction;

const defaultProfileState: ProfileState = {
  firstName: null,
  lastName: null,
  email: "",
  username: "",
  croppedAvatar: null,
  savedAvatarUrl: null,
  isDirty: false,
  errors: {},
};

export const createProfileStore = (initProps?: { user: User }) => {
  return createStore<ProfileStore>()(
    persist(
      (set) => ({
        ...defaultProfileState,
        firstName: initProps?.user.firstName ?? null,
        lastName: initProps?.user.lastName ?? null,
        email: initProps?.user.email ?? "",
        username: initProps?.user.username ?? "",
        savedAvatarUrl: initProps?.user.avatarUrl ?? null,

        setField: (field, value) =>
          set(() => ({
            [field]: value,
            isDirty: true,
          })),

        setErrors: (errors) =>
          set(() => ({
            errors,
            isDirty: true,
          })),

        clearCroppedAvatar: () =>
          set(() => ({
            croppedAvatar: null,
          })),

        recomputeIsDirty: () =>
          set((state) => ({
            isDirty:
              state.croppedAvatar !== null ||
              state.firstName !== initProps?.user.firstName ||
              state.lastName !== initProps?.user.lastName ||
              state.email !== initProps?.user.email ||
              state.username !== initProps?.user.username,
          })),

        resetFromDb: (profileDataFromDb) =>
          set(() => ({
            firstName: profileDataFromDb.firstName,
            lastName: profileDataFromDb.lastName,
            email: profileDataFromDb.email,
            username: profileDataFromDb.username,
            savedAvatarUrl: profileDataFromDb.avatarUrl,
            isDirty: false,
            errors: {},
          })),
      }),
      {
        name: "profile-storage",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          username: state.username,
          savedAvatarUrl: state.savedAvatarUrl,
          errors: state.errors,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.recomputeIsDirty();
          }
        },
      }
    )
  );
};

type ProfileStoreApi = ReturnType<typeof createProfileStore>;

export const ProfileStoreContext = createContext<ProfileStoreApi | undefined>(
  undefined
);

// eslint-disable-next-line no-unused-vars
export function useProfileStore<T>(selector: (state: ProfileStore) => T): T {
  const store = use(ProfileStoreContext);
  if (!store) throw new Error("Missing ProfileContext.Provider in the tree");
  return useStore(store, selector);
}
