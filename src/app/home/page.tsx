"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import { ToastContainer, toast } from "react-toastify";
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
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const CoinList: React.FC = () => {
  const [coins, setCoins] = useState<Cryptocurrency[]>([]);
  const { theme } = useTheme();

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
        console.log(response.data);
      } catch (error) {
        toast("Error fetching the coin list");
        console.log(error);
      }
    };

    fetchCoins();
  }, []);

  // Determine background image based on the theme
  const backgroundImage =
    theme === "dark" ? "/bg/home-dark.jpg" : "/bg/home-light.jpg";

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-fixed backdrop-blur-sm bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute w-full min-h-screen inset-0 backdrop-blur-sm"></div>
      <div className="z-5 w-full p-5 flex flex-col items-center justify-center min-h-screen">
        <ToastContainer />
        {coins.length === 0 ? (
          <div className="flex justify-center items-center min-h-screen">
            <Loading />
          </div>
        ) : (
          <>
            {/* Currency Selector */}
            <div className="mt-16 sm:mt-24 z-10 relative flex flex-wrap gap-5 justify-center w-full">
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent className="z-20 max-h-60 overflow-auto">
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="inr">INR</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="z-20 max-h-60 overflow-auto">
                  <SelectItem value="usd">Low to high</SelectItem>
                  <SelectItem value="inr">High to low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Coin Grid */}
            <div className="w-full flex justify-center items-center">
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-3 md:gap-5 lg:gap-10 p-5 max-w-screen-2xl mx-auto">
                {coins.map((coin) => (
                  <CurrencyCard
                    id={coin.id}
                    img={coin.image}
                    key={coin.id}
                    name={coin.name}
                    symbol={coin.symbol}
                    currentPrice={coin.current_price}
                    priceChange24hr={coin.price_change_percentage_24h}
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
