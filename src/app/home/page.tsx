"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrencyCard from "@/components/CurrencyCard";
import Loading from "@/app/Loading";
import { Cryptocurrency } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Currency {
  label: string;
  value: string;
}

const CoinList: React.FC = () => {
  const [coins, setCoins] = useState<Cryptocurrency[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("usd");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { theme } = useTheme();
  const [backgroundImage, setBackgroundImage] =
    useState<string>("/bg/home-dark.jpg");

  const itemsPerPage = 17; // max items per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setBackgroundImage(
      theme === "light" ? "/bg/home-light.jpg" : "/bg/home-dark.jpg"
    );
  }, [theme]);

  useEffect(() => {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Error fetching the coin list");
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Error fetching currencies!");
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
    let filteredCoins = coins;

    // Apply search query first
    if (searchQuery.trim() !== "") {
      filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (!sortOrder) return filteredCoins;

    // Apply sorting
    return [...filteredCoins].sort((a, b) => {
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
  }, [coins, sortOrder, searchQuery]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Paginated coins are based on the sorted and filtered list
  const currentCoins = sortedCoins.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages based on filtered coins
  const totalPages = Math.ceil(sortedCoins.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    // Prevent navigating out of bounds
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Reset currentPage when searchQuery changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
            <div className="mt-16 sm:mt-24 flex flex-col justify-between z-10 relative w-full max-w-screen-2xl mx-auto">
              <div className="w-full mb-2 h-fit">
                <div className="w-full flex justify-center">
                  <h1
                    className="text-2xl md:text-4xl pt-5 w-full text-center font-bold mb-4"
                    style={{ textShadow: "1px 1px 3px black" }}
                  >
                    <span className="text-blue-500">All</span> Cryptocurrencies
                  </h1>
                </div>

                <div className="w-full max-w-screen-2xl mx-auto z-10 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
                    {/* Left Section: Search Box */}
                    <input
                      type="text"
                      placeholder="Search Coins"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-1/3 px-4 py-2 border-blue-700 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Right Section: Currency and Sort Options */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-4 sm:gap-0 w-full sm:w-auto">
                      {/* Currency Selector */}
                      <Select
                        onValueChange={(value) => setSelectedCurrency(value)}
                      >
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent className="z-20 max-h-60 overflow-auto">
                          {currencies.map((currency) => (
                            <SelectItem
                              key={currency.value}
                              value={currency.value}
                            >
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Sort Selector */}
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
                  </div>
                </div>
              </div>

              {/* Coin List */}
              <div className="w-full min-h-screen">
                <div className="grid w-full min-h-fit grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-3 md:gap-5 lg:gap-10 p-5 max-w-screen-2xl mx-auto">
                  {currentCoins.map((coin) => (
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
                {/* Pagination Controls */}
                <Pagination>
                  <PaginationContent className="flex flex-wrap justify-center gap-2">
                    {/* Previous Button */}
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() => paginate(currentPage - 1)}
                          className="px-3 py-1"
                        >
                          Previous
                        </PaginationPrevious>
                      </PaginationItem>
                    )}

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          onClick={() => paginate(index + 1)}
                          className={`px-3 py-1 ${
                            currentPage === index + 1
                              ? "bg-blue-500 text-white rounded shadow-md"
                              : "hover:bg-gray-500"
                          }`}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {/* Next Button */}
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() => paginate(currentPage + 1)}
                          className="px-3 py-1"
                        >
                          Next
                        </PaginationNext>
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoinList;
