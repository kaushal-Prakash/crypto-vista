'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoHeartFill, GoHeart } from "react-icons/go";
import CardLabel from "../card label/CardLabel";

interface CurrencyCardProps {
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

const CurrencyCard: React.FC<CurrencyCardProps> = ({
  id,
  name,
  symbol,
  currentPrice,
  priceChange24hr,
  img,
  currency,
  isFavorite = false,
  onFavoriteToggle,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite); // Update local state when parent updates
  }, [isFavorite]);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
    if (onFavoriteToggle) {
      onFavoriteToggle(id); // Notify parent to update favorites in localStorage
    }
  };

  return (
    <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-4 transition-transform transform hover:scale-105 duration-200 ease-in-out hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-200 dark:hover:from-gray-700 dark:hover:to-gray-600">
      {/* Heart Button */}
      <button
        onClick={handleHeartClick}
        className="absolute top-3 right-3 p-3 rounded-full transition hover:text-red-600 text-gray-500 dark:text-gray-400"
      >
        {favorite ? (
          <GoHeartFill size={24} className="text-red-600" />
        ) : (
          <GoHeart size={24} />
        )}
      </button>

      {/* Main Content */}
      <Link href={`/home/${id}`} passHref>
        <div className="flex flex-col items-center gap-4 cursor-pointer">
          {/* Image */}
          <Image
            src={img}
            height={80}
            width={80}
            alt={`${name} logo`}
            className="rounded-full shadow-lg"
          />
          {/* Label */}
          <CardLabel text={symbol.toUpperCase()} />

          {/* Details */}
          <div className="w-full text-center">
            {/* Name */}
            <h5 className="text-lg font-bold text-gray-900 dark:text-white">
              {name}
            </h5>

            {/* Price and 24hr Change */}
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Current Price:{" "}
                <span className="text-gray-900 dark:text-white">
                  {currentPrice.toFixed(2)} {currency.toUpperCase()}
                </span>
              </p>
              <p
                className={`text-sm font-medium ${
                  priceChange24hr >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                24hr Change: {priceChange24hr >= 0 ? "+" : ""}
                {priceChange24hr.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CurrencyCard;
