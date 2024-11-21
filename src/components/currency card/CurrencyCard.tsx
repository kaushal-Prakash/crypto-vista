import React from "react";
import Link from "next/link";
import { GoHeartFill } from "react-icons/go";

interface CurrencyCardProps {
  name: string;
  symbol: string;
  currentPrice: number;
  priceChange24hr: number;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({
  name,
  symbol,
  currentPrice,
  priceChange24hr,
}) => {
  return (
    <Link href={`/currency/${symbol.toLowerCase()}`} passHref>
      <div className="cursor-pointer max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-around mb-6">

        <div>
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name} ({symbol})
            </h5>
          </div>
          <div>
            <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400">
              Current Price: ${currentPrice.toFixed(2)}
            </p>
            <p
              className={`mb-3 font-semibold ${
                priceChange24hr >= 0 ? "text-green-500" : "text-red-500"
              } dark:${
                priceChange24hr >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              24h Change: {priceChange24hr >= 0 ? "+" : "-"}
              {priceChange24hr.toFixed(2)}%
            </p>
          </div>

          <div className="w-full">
            <button className="text-right">
              <GoHeartFill
                size={24}
                className="hover:text-red-600 transition-all"
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CurrencyCard;
