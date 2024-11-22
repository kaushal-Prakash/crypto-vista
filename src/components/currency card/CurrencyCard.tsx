'use client';

import Image from "next/image";
import Link from "next/link";
import { GoHeartFill } from "react-icons/go";

interface CurrencyCardProps {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  priceChange24hr: number;
  img:string;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({
  id,
  name,
  symbol,
  currentPrice,
  priceChange24hr,
  img
}) => {
  return (
    <Link href={`/home/${id}`}>
      <div className="cursor-pointer max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center bg-transparent backdrop-blur-md justify-around mb-6 hover:bg-gradient-to-br hover:from-purple-100 hover:to-blue-300 hover:scale-105 transition-transform duration-300">
        <div>
          <Image src={img} height={50} width={50} alt="logo" />
        </div>
        <div >
          <div className="flex gap-3 items-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <p className="dark:text-white">({symbol})</p>
          </div>
          <div>
            <p className="mb-3 font-semibold dark:text-gray-500"
            >
              Current Price: ${currentPrice.toFixed(2)}
            </p>
            <p
              className={`mb-3 font-semibold ${
                priceChange24hr >= 0 ? "text-green-700" : "text-red-500"
              } dark:${
                priceChange24hr >= 0 ? "text-green-700" : "text-red-500"
              }`}
            >
              24hr Change: {priceChange24hr >= 0 ? "+" : ""}
              {priceChange24hr.toFixed(2)}%
            </p>
          </div>

          <div className="w-full">
            <button className="text-right">
              <GoHeartFill
                size={24}
                className="hover:text-red-600 transition-all text-slate-500"
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CurrencyCard;
