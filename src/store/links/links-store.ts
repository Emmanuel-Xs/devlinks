/* eslint-disable no-unused-vars */
import { createContext, use } from "react";

import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import { Link } from "@/drizzle/schema";

const sortBySequenceDesc = (a: Link, b: Link) => b.sequence - a.sequence;

type LinkState = {
  linksFromDb: Link[];
  links: Link[];
  modifiedLinkIds: Set<string>;
  errors: Record<string, string | undefined>;
  isValid: boolean;
};

type LinkAction = {
  addNewLink: (newLink: Link) => void;
  updateLink: (id: string, updates: Partial<Link>) => void;
  removeLink: (id: string) => void;
  reorderLinks: (links: Link[]) => void;
  getModifiedLinks: () => Link[];
  setLinksFromDb: (newLinksFromDb: Link[]) => void;
  setError: (id: string, error: string | undefined) => void;
  hasChanges: () => boolean;
};

type LinkStore = LinkState & LinkAction;

const defaultLinkState: LinkState = {
  linksFromDb: [],
  links: [],
  modifiedLinkIds: new Set<string>(),
  errors: {},
  isValid: true,
};

export const createLinksStore = (initProps?: { userLinks: Link[] }) => {
  return createStore<LinkStore>()(
    persist(
      (set, get) => ({
        ...defaultLinkState,
        linksFromDb: initProps?.userLinks || [],
        links: initProps?.userLinks?.toSorted(sortBySequenceDesc) || [],

        addNewLink(newLink) {
          set((state) => {
            const newLinks = [newLink, ...state.links].map((link, index) => ({
              ...link,
              sequence: state.links.length + 1 - index,
            }));
            return {
              links: newLinks.toSorted(sortBySequenceDesc),
              modifiedLinkIds: new Set([
                ...Array.from(state.modifiedLinkIds),
                newLink.id,
              ]),
              isValid: Object.values(state.errors).every((error) => !error),
            };
          });
        },

        updateLink(id, updates) {
          set((state) => {
            const modifiedLinks = state.links.map((link) =>
              link.id === id ? { ...link, ...updates } : link
            );

            const newModifiedIds = new Set(Array.from(state.modifiedLinkIds));

            const updatedLink = modifiedLinks.find((link) => link.id === id);
            const dbLink = state.linksFromDb.find((link) => link.id === id);

            // Compare the updated link with its DB version
            if (dbLink && updatedLink) {
              const hasChanged =
                updatedLink.url !== dbLink.url ||
                updatedLink.platform !== dbLink.platform ||
                updatedLink.sequence !== dbLink.sequence;

              if (hasChanged) {
                newModifiedIds.add(id);
              } else {
                newModifiedIds.delete(id);
              }
            } else if (!dbLink) {
              // If link doesn't exist in DB, mark it as modified and also handles newly added links that aren't in linksFromDb
              newModifiedIds.add(id);
            }

            return {
              links: modifiedLinks,
              modifiedLinkIds: newModifiedIds,
              isValid: Object.values(state.errors).every((error) => !error),
            };
          });
        },

        removeLink(id) {
          set((state) => {
            const linkExistsInDb = state.linksFromDb.some(
              (link) => link.id === id
            );
            const filtered = state.links.filter((link) => link.id !== id);
            const reSequenced = filtered
              .map((link, index) => ({
                ...link,
                sequence: filtered.length - index,
              }))
              .toSorted(sortBySequenceDesc);

            const newModifiedIds = new Set(Array.from(state.modifiedLinkIds));
            if (linkExistsInDb) {
              newModifiedIds.add(id);
            } else {
              newModifiedIds.delete(id);
            }

            const newErrors = { ...state.errors };
            delete newErrors[id];

            return {
              links: reSequenced,
              modifiedLinkIds: newModifiedIds,
              errors: newErrors,
              isValid: Object.values(newErrors).every((error) => !error),
            };
          });
        },

        reorderLinks(newLinks) {
          set((state) => {
            const reorderedLinks = newLinks
              .map((link, index) => ({
                ...link,
                sequence: newLinks.length - index,
              }))
              .toSorted(sortBySequenceDesc);

            const newModifiedIds = new Set(Array.from(state.modifiedLinkIds));

            reorderedLinks.forEach((link) => {
              const dbLink = state.linksFromDb.find((l) => l.id === link.id);
              if (!dbLink || dbLink.sequence !== link.sequence) {
                newModifiedIds.add(link.id);
              } else if (dbLink.sequence === link.sequence) {
                newModifiedIds.delete(link.id);
              }
            });

            return {
              links: reorderedLinks,
              modifiedLinkIds: newModifiedIds,
              isValid: Object.values(state.errors).every((error) => !error),
            };
          });
        },

        setError(id, error) {
          set((state) => {
            const newErrors = { ...state.errors };
            if (error) {
              newErrors[id] = error;
            } else {
              delete newErrors[id];
            }
            return {
              errors: newErrors,
              isValid: Object.values(newErrors).every((error) => !error),
            };
          });
        },

        hasChanges() {
          const state = get();
          return state.modifiedLinkIds.size > 0;
        },

        getModifiedLinks: () => {
          const state = get();
          return state.links.filter((link) =>
            Array.from(state.modifiedLinkIds).includes(link.id)
          );
        },

        setLinksFromDb: (newLinksFromDb) => {
          const sortedLinks = newLinksFromDb.toSorted(sortBySequenceDesc);
          set(() => ({
            linksFromDb: sortedLinks,
            links: sortedLinks,
            modifiedLinkIds: new Set(),
            errors: {},
            isValid: true,
          }));
        },
      }),
      {
        name: "links-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          links: state.links,
          linksFromDb: state.linksFromDb,
          modifiedLinkIds: Array.from(state.modifiedLinkIds),
          errors: state.errors,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.modifiedLinkIds = new Set(state.modifiedLinkIds);
          }
        },
      }
    )
  );
};

type LinksStoreApi = ReturnType<typeof createLinksStore>;

// Create context
export const LinksStoreContext = createContext<LinksStoreApi | undefined>(
  undefined
);

// Custom hook to use the store
export function useLinksStore<T>(selector: (state: LinkStore) => T): T {
  const store = use(LinksStoreContext);
  if (!store) throw new Error("Missing LinksContext.Provider in the tree");
  return useStore(store, selector);
}
