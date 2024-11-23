"use client";

import { atom } from "recoil";

export interface Cryptocurrency {
  market_cap: number;
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  currency: string;
}

// Atom for storing the cryptocurrency list
export const cryptoListState = atom<Cryptocurrency[]>({
  key: "cryptoListState",
  default: [], // Initial state: empty list
});

// Atom for storing the favorites list, synced with localStorage
export const favoritesState = atom<string[]>({
  key: "favoritesState",
  default: [], // Initial state: empty list
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      // Load favorites from localStorage on initialization
      if (typeof window !== "undefined") {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
          setSelf(JSON.parse(savedFavorites));
        }
      }

      // Sync favorites to localStorage whenever it changes
      onSet((newFavorites) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
        }
      });
    },
  ],
});
