/* eslint-disable no-unused-vars */
import { createContext, use } from "react";

import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import { Link } from "@/drizzle/schema";

// Basic state types
type LinkState = {
  linksFromDb: Link[];
  links: Link[];
  modifiedLinkIds: Set<string>;
};

// Action types
type LinkAction = {
  addNewLink: (newLink: Link) => void;
  updateLink: (id: string, updates: Partial<Link>) => void;
  removeLink: (id: string) => void;
  reorderLinks: (links: Link[]) => void;
  resetToOriginal: () => void;
  getModifiedLinks: () => Link[];
  markAllAsSaved: () => void;
};

type LinkStore = LinkState & LinkAction;

const defaultLinkState: LinkState = {
  linksFromDb: [],
  links: [],
  modifiedLinkIds: new Set<string>(),
};

// Store creator function that accepts initial props
export const createLinksStore = (initProps?: { userLinks: Link[] }) => {
  const DEFAULT_PROPS = defaultLinkState;

  return createStore<LinkStore>()(
    persist(
      (set, get) => ({
        ...DEFAULT_PROPS,
        linksFromDb: initProps?.userLinks || [],
        links:
          initProps?.userLinks?.toSorted((a, b) => b.sequence - a.sequence) ||
          [],

        addNewLink(newLink) {
          set((state) => {
            const newLinks = [newLink, ...state.links].map((link, index) => ({
              ...link,
              sequence: state.links.length + 1 - index,
            }));
            return {
              links: newLinks.toSorted((a, b) => b.sequence - a.sequence),
              modifiedLinkIds: new Set(state.modifiedLinkIds).add(newLink.id),
            };
          });
        },

        updateLink(id, updates) {
          set((state) => ({
            links: state.links.map((link) =>
              link.id === id ? { ...link, ...updates } : link
            ),
            modifiedLinkIds: new Set(state.modifiedLinkIds).add(id),
          }));
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
              .toSorted((a, b) => b.sequence - a.sequence);

            const newModifiedIds = new Set(state.modifiedLinkIds);
            if (linkExistsInDb) {
              newModifiedIds.add(id);
            } else {
              newModifiedIds.delete(id);
            }

            return {
              links: reSequenced,
              modifiedLinkIds: newModifiedIds,
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
              .toSorted((a, b) => b.sequence - a.sequence);

            const newModifiedIds = new Set(state.modifiedLinkIds);

            reorderedLinks.forEach((link) => {
              const dbLink = state.linksFromDb.find((l) => l.id === link.id);
              if (!dbLink || dbLink.sequence !== link.sequence) {
                newModifiedIds.add(link.id);
              }
            });

            return {
              links: reorderedLinks,
              modifiedLinkIds: newModifiedIds,
            };
          });
        },

        resetToOriginal: () => {
          set((state) => ({
            links: state.linksFromDb.toSorted(
              (a, b) => b.sequence - a.sequence
            ),
            modifiedLinkIds: new Set(),
          }));
        },

        getModifiedLinks: () => {
          const state = get();
          return state.links.filter((link) =>
            state.modifiedLinkIds.has(link.id)
          );
        },

        markAllAsSaved: () => {
          set((state) => ({
            linksFromDb: state.links,
            modifiedLinkIds: new Set(),
          }));
        },
      }),
      {
        name: "links-store",
        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          links: state.links,
          linksFromDb: state.linksFromDb,
          modifiedLinkIds: Array.from(state.modifiedLinkIds),
        }),
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
