'use client';

import Image from "next/image";
import Link from "next/link";
import { GoHeartFill } from "react-icons/go";
import CardLabel from "../card label/CardLabel";

interface CurrencyCardProps {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  priceChange24hr: number;
  img: string;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({
  id,
  name,
  symbol,
  currentPrice,
  priceChange24hr,
  img,
}) => {
  const handleHeartClick = (e: React.MouseEvent) => {
    // Prevent default and propagation for the heart icon click
    e.preventDefault();
    e.stopPropagation();
    console.log("Heart clicked!");
  };

  return (
    <div className="relative max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between backdrop-blur-md hover:bg-gradient-to-br hover:from-purple-100 hover:to-blue-300 hover:scale-105 transition-transform duration-200 ease-linear">
      {/* Heart Button */}
      <button
        onClick={handleHeartClick}
        className="p-2 rounded-full absolute top-3 right-3 transition hover:text-red-600 text-slate-500"
      >
        <GoHeartFill size={24} />
      </button>

      {/* Main Content */}
      <Link href={`/home/${id}`} passHref>
        <div className="flex gap-4 items-center w-full cursor-pointer">
          {/* Image and Label */}
          <div className="flex flex-col items-center">
            <Image
              src={img}
              height={60}
              width={60}
              alt={`${name} logo`}
              className="rounded-full"
            />
            <div className="mt-2">
              <CardLabel text={symbol} />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-grow">
            {/* Name */}
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">
              {name}
            </h5>

            {/* Price and 24hr Change */}
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Current Price:{" "}
                <span className="text-gray-900 dark:text-white">
                  ${currentPrice.toFixed(2)}
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
