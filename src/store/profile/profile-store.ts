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
  isDirty: boolean;
  errors: Record<string, string[]> | undefined;
};

type ProfileDataFromDb = {
  firstName: string | null;
  lastName: string | null;
  email: string;
  username: string;
};

type ProfileAction = {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  setField: (field: keyof Omit<ProfileState, "isDirty">, value: any) => void;
  // eslint-disable-next-line no-unused-vars
  setErrors: (errors: Record<string, string[]> | undefined) => void;
  // eslint-disable-next-line no-unused-vars
  resetFromDb: (profileDataFromDb: ProfileDataFromDb) => void;
};

type ProfileStore = ProfileState & ProfileAction;

const defaultProfileState: ProfileState = {
  firstName: null,
  lastName: null,
  email: "",
  username: "",
  croppedAvatar: null,
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

        resetFromDb: (profileDataFromDb) =>
          set(() => ({
            firstName: profileDataFromDb.firstName,
            lastName: profileDataFromDb.lastName,
            email: profileDataFromDb.email,
            username: profileDataFromDb.username,
            croppedAvatar: null,
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
          errors: state.errors,
          isDirty: state.isDirty,
        }),
      }
    )
  );
};

type ProfileStoreApi = ReturnType<typeof createProfileStore>;

// Create context
export const ProfileStoreContext = createContext<ProfileStoreApi | undefined>(
  undefined
);

// Custom hook to use the store
// eslint-disable-next-line no-unused-vars
export function useProfileStore<T>(selector: (state: ProfileStore) => T): T {
  const store = use(ProfileStoreContext);
  if (!store) throw new Error("Missing ProfileContext.Provider in the tree");
  return useStore(store, selector);
}
