"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ExchangeCardProps {
  id: string;
  name: string;
  tradingVolume: number | null;  // Allow null value
  tradeVolumeN: number | null;   // Allow null value
  image: string;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  name,
  tradingVolume,
  tradeVolumeN,
  image,
}) => {
  // Function to determine trading volume color (green for positive, red for negative)
  const getTradingVolumeColor = (volume: number) => {
    return volume > 0 ? "text-green-500" : "text-red-500";
  };

  const safeTradingVolume = tradingVolume ?? 0; // Fallback to 0 if null or undefined
  const safeTradeVolumeN = tradeVolumeN ?? 0;   // Fallback to 0 if null or undefined

  return (
    <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-between backdrop-blur-md hover:scale-105 transition-transform duration-200 ease-linear">
      {/* Exchange Details */}
      
      <Link href="#" passHref>
        <div className="flex flex-col items-center w-full cursor-pointer">
          {/* Image */}
          <div className="relative w-16 h-16 mb-4">
            <Image
              src={image}
              alt={`${name} logo`}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>

          {/* Exchange Information */}
          <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h5>

          <div className="text-sm text-center font-medium text-gray-600 dark:text-gray-400 mb-2">
            {/* Trading Volume */}
            <p className={`${getTradingVolumeColor(safeTradingVolume)} mb-2`}>
              24h Trading Volume : {safeTradingVolume.toFixed(2)}
            </p>

            {/* Cryptocurrencies Traded */}
            <p>24h Trading Volume (Normalized): {safeTradeVolumeN.toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ExchangeCard;
