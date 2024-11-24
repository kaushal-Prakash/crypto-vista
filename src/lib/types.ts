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

export interface CurrencyCardProps {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  priceChange24hr: number;
  img: string;
  currency: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export interface Exchange {
  id: string;
  name: string;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
  image: string;
}
