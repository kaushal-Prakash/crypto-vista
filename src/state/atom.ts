// atoms.ts
import { atom } from 'recoil';
interface Cryptocurrency {
    market_cap: number;
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    currency: string;
}
export const coinListState = atom<Cryptocurrency[]>({
  key: 'coinListState',
  default: [],
});

export const favoritesState = atom<string[]>({
  key: 'favoritesState',
  default: (() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  })(),
});
