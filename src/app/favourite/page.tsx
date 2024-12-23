'use client'
import React, { useEffect, useState } from "react";
import CurrencyCard from "@/components/CurrencyCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

const Favorites: React.FC = () => {
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

  const [favorites, setFavorites] = useState<string[]>([]);
  const [coins, setCoins] = useState<Cryptocurrency[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>( 
    "/bg/fav-dark.jpg"
  );
  const { theme } = useTheme();

  useEffect(() => {
    setBackgroundImage(
      theme === "light" ? "/bg/fav-light.jpg" : "/bg/fav-dark.jpg"
    );
  }, [theme]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get<Cryptocurrency[]>( 
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: favorites.join(","),
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching favorite coins:", error);
      }
    };

    if (favorites.length > 0) fetchCoins();
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(id)) {
      updatedFavorites = updatedFavorites.filter((favId) => favId !== id);
      toast.success("Removed coin from favorites!");

      // If no favorites are left, trigger a page reload
      if (updatedFavorites.length === 0) {
        window.location.reload();
      }
    } else {
      updatedFavorites.push(id);
      toast.success("Added coin to favorites!");
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col bg-fixed items-center p-5 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Full-Screen Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-md z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 w-full">
        {coins.length === 0 ? (
          <div className="grid place-content-center w-full h-screen">
            {/* Funny Text Styling */}
            <Image
              src="/fav/nothing.png"
              alt="Nothing to show"
              width={250}
              height={250}
              className="mt-8 mx-auto"
            />
            <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-16 sm:mt-32 text-center">
              Oops! Looks like you&apos;re on a coin diet. No favorites yet!          
            </p>
            <p className="text-lg sm:text-xl -translate-y-5 sm:-translate-y-10 md:-translate-y-24 font-semibold text-gray-800 dark:text-slate-300 mt-16 sm:mt-32 text-center">
            Start adding your favorite coins and make them rich!
            </p>
          </div>
        ) : (
          <>
            <div className="text-center my-8 mt-24">
              <Image src="/fav/nothing.jpg" alt="nothing img" layout="fill" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-black dark:from-blue-500 dark:to-white bg-clip-text text-transparent">
                Your Favorite Currencies!!
              </h1>
            </div>

            <div className="w-full flex justify-center items-center">
              <div className="grid p-1 w-full max-w-screen-2xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-3 md:gap-5 lg:gap-10 justify-items-center">
                {coins.map((coin) => (
                  <CurrencyCard
                    isFavorite={favorites.includes(coin.id)}
                    key={coin.id}
                    id={coin.id}
                    img={coin.image}
                    name={coin.name}
                    symbol={coin.symbol}
                    currentPrice={coin.current_price}
                    priceChange24hr={coin.price_change_percentage_24h}
                    currency="usd"
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

export default Favorites;
