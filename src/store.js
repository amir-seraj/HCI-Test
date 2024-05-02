import { create } from "zustand";

export const useStorePageVisits = create((set) => ({
  pageVisits: [],
  addPageVisits: (page, timestamp) =>
    set((store) => ({
      pageVisits: [...store.pageVisits, { page, timestamp }],
    })),
}));
export const useStorePageTimes = create((set) => ({
  pageTimes: [],
  addPageTimes: (page, timeSpent) =>
    set((store) => ({
      pageTimes: [...store.pageTimes, { page, timeSpent }],
    })),
}));
