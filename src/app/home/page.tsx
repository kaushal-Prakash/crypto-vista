"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import toast, { Toaster } from 'react-hot-toast';
import CurrencyCard from "@/components/currency card/CurrencyCard";
import Loading from "@/app/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface currency {
  label: string;
  value: string;
}

const CoinList: React.FC = () => {
  const [coins, setCoins] = useState<Cryptocurrency[]>([]);
  const [currencies, setCurrencies] = useState<currency[]>([]);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("usd");
  const [favorites, setFavorites] = useState<string[]>([]);
  const { theme } = useTheme();
  useEffect(() => {
    // Load favorites from localStorage on component mount
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get<Cryptocurrency[]>(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: { vs_currency: selectedCurrency, order: "market_cap_desc" },
          }
        );
        setCoins(response.data);
      } catch (error) {
        toast("Error fetching the coin list");
        console.log(error);
      }
    };

    fetchCoins();
  }, [selectedCurrency]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get<string[]>(
          "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
        );
        const formattedCurrencies = response.data.map((currency) => ({
          label: currency.toUpperCase(),
          value: currency,
        }));
        setCurrencies(formattedCurrencies);
      } catch (error) {
        toast("Error fetching currencies!");
        console.log(error);
      }
    };

    fetchCurrencies();
  }, []);

  const toggleFavorite = (id: string) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(id)) {
      updatedFavorites = updatedFavorites.filter((favId) => favId !== id);
      toast.success("Removed coin from favorites!");
    } else {
      updatedFavorites.push(id);
      toast.success("Added coin to favorites!");
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  
  const sortedCoins = React.useMemo(() => {
    if (!sortOrder) return coins;

    return [...coins].sort((a, b) => {
      switch (sortOrder) {
        case "market-cap-asc":
          return a.market_cap - b.market_cap;
        case "market-cap-desc":
          return b.market_cap - a.market_cap;
        case "percentage-change-asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case "percentage-change-desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "low-to-high":
          return a.current_price - b.current_price;
        case "high-to-low":
          return b.current_price - a.current_price;
        default:
          return 0;
      }
    });
  }, [coins, sortOrder]);

  const backgroundImage =
    theme === "dark" ? "/bg/home-dark.jpg" : "/bg/home-light.jpg";

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-fixed backdrop-blur-sm bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute w-full min-h-screen inset-0 backdrop-blur-sm"></div>
      <div className="z-5 relative w-full p-5 flex flex-col items-center justify-center min-h-screen">
        {coins.length === 0 ? (
          <div className="flex justify-center items-center min-h-screen">
            <Loading />
          </div>
        ) : (
          <>
            <div className="z-50">
              <Toaster
               toastOptions={{
                className: 'mt-24',
              }}/>
            </div>
            <div className="mt-16 sm:mt-24 z-10 relative flex flex-wrap gap-5 justify-center w-full">
              <Select onValueChange={(value) => setSelectedCurrency(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent className="z-20 max-h-60 overflow-auto">
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setSortOrder(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="z-20 max-h-60 overflow-auto">
                  <SelectItem value="low-to-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="high-to-low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="market-cap-asc">
                    Market Cap: Low to High
                  </SelectItem>
                  <SelectItem value="market-cap-desc">
                    Market Cap: High to Low
                  </SelectItem>
                  <SelectItem value="percentage-change-asc">
                    % Change: Low to High
                  </SelectItem>
                  <SelectItem value="percentage-change-desc">
                    % Change: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full flex justify-center items-center">
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-3 md:gap-5 lg:gap-10 p-5 max-w-screen-2xl mx-auto">
                {sortedCoins.map((coin) => (
                  <CurrencyCard
                    id={coin.id}
                    img={coin.image}
                    key={coin.id}
                    name={coin.name}
                    symbol={coin.symbol}
                    currentPrice={coin.current_price}
                    priceChange24hr={coin.price_change_percentage_24h}
                    currency={selectedCurrency}
                    isFavorite={favorites.includes(coin.id)}
                    onFavoriteToggle={() => toggleFavorite(coin.id)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoinList;
