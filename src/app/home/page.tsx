"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CurrencyCard from "@/components/currency card/CurrencyCard";

//interface for the cryptocurrency data
interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const CoinList: React.FC = () => {
  const [coins, setCoins] = useState<Cryptocurrency[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get<Cryptocurrency[]>(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        toast("Error fetching the coin list");
        console.log(error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div>
        <ToastContainer />
        <h1>Cryptocurrency List</h1>
        {coins.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="grid w-full min-h-screen grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-3 md:gap-5 lg:gap-10">
            {coins.map((coin) => (
              <CurrencyCard
                key={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                currentPrice={coin.current_price}
                priceChange24hr={coin.price_change_percentage_24h}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinList;
