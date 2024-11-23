"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import CurrencyCard from "@/components/currency card/CurrencyCard";
import Loading from "@/app/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchCoin {
  id: string;
  name: string;
  symbol: string;
  large: string;
  market_cap?: number;
  current_price?: number;
  price_change_percentage_24h?: number;
}

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  image: string;
  market_cap: number;
  current_price: number;
  price_change_percentage_24h: number;
}

const SearchPage: React.FC = () => {
  const [coins, setCoins] = useState<Cryptocurrency[]>([]);
  const [query, setQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query.length > 2) {
      const fetchCoins = async () => {
        setLoading(true);
        try {
          const response = await axios.get<{ coins: SearchCoin[] }>(
            "https://api.coingecko.com/api/v3/search",
            {
              params: { query },
            }
          );
          const searchResults = response.data.coins.map((coin) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            image: coin.large,
            market_cap: coin.market_cap || 0,
            current_price: coin.current_price || 0,
            price_change_percentage_24h: coin.price_change_percentage_24h || 0,
          }));
          setCoins(searchResults);
        } catch (error) {
          toast.error("Error fetching search results!");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchCoins();
    } else {
      setCoins([]); // Clear results for short queries
    }
  }, [query]);

  const sortedCoins = React.useMemo(() => {
    if (!sortOrder) return coins;

    return [...coins].sort((a, b) => {
      switch (sortOrder) {
        case "market-cap-asc":
          return a.market_cap - b.market_cap;
        case "market-cap-desc":
          return b.market_cap - a.market_cap;
        case "low-to-high":
          return a.current_price - b.current_price;
        case "high-to-low":
          return b.current_price - a.current_price;
        default:
          return 0;
      }
    });
  }, [coins, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search for a cryptocurrency..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-96 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        {loading ? (
            <div className="flex justify-center">
            <Loading />
          </div>
        ) : coins.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
            No results found. Start typing to search for cryptocurrencies.
          </p>
        ) : (
            <>
            <Toaster
               toastOptions={{
                className: 'mt-24',
            }}/>
            <div className="flex justify-end mb-4">
              <Select onValueChange={(value) => setSortOrder(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
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
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedCoins.map((coin) => (
                <CurrencyCard
                  id={coin.id}
                  img={coin.image}
                  key={coin.id}
                  name={coin.name}
                  symbol={coin.symbol}
                  currentPrice={coin.current_price}
                  priceChange24hr={coin.price_change_percentage_24h}
                  currency="usd" // Assuming USD for now
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
