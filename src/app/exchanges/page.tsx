"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExchangeCard from "@/components/ExchangeCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useTheme } from "next-themes";

// Define the TypeScript type for exchange data
interface Exchange {
  id: string;
  name: string;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
  image: string;
}

type SortOrder =
  | "volume-asc"
  | "volume-desc"
  | "name-asc"
  | "name-desc"
  | "crypto-asc"
  | "crypto-desc";

function ExchangesPage() {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("volume-desc"); // Set initial sort order
  const [backgroundImage, setBackgroundImage] = useState<string>("/bg/exchange-dark.jpg");
  const { theme } = useTheme();

  // Pagination states
  const itemsPerPage = 17;
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setBackgroundImage(theme === "light" ? "/bg/exchange-light.jpg" : "/bg/exchange-dark.jpg");
  }, [theme]);

  useEffect(() => {
    const fetchExchanges = async () => {
      const response = await fetch("https://api.coingecko.com/api/v3/exchanges");
      const data = await response.json();
      setExchanges(data);
    };

    fetchExchanges();
  }, []);

  const filteredExchanges = exchanges.filter((exchange) =>
    exchange.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedExchanges = filteredExchanges.sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "volume-asc":
        return (a.trade_volume_24h_btc ?? 0) - (b.trade_volume_24h_btc ?? 0);
      case "volume-desc":
        return (b.trade_volume_24h_btc ?? 0) - (a.trade_volume_24h_btc ?? 0);
      case "crypto-asc":
        return (
          (a.trade_volume_24h_btc_normalized ?? 0) - (b.trade_volume_24h_btc_normalized ?? 0)
        );
      case "crypto-desc":
        return (
          (b.trade_volume_24h_btc_normalized ?? 0) - (a.trade_volume_24h_btc_normalized ?? 0)
        );
      default:
        return 0;
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExchanges = sortedExchanges.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedExchanges.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page on search or sorting change
  }, [searchQuery, sortOrder]);

  return (
    <div
      className="relative min-h-screen w-full mx-auto p-6 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Full-Screen Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-md z-10"></div>

      {/* Main Content */}
      <div className="relative z-20">
        <h1 className="text-2xl md:text-4xl pt-24 w-full text-center font-bold mb-4">
          Cryptocurrency Exchanges
        </h1>

        <div className="mb-4 flex gap-4 flex-wrap justify-center items-center">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search exchanges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 border rounded w-full sm:w-[200px] md:w-[300px] mb-4"
          />
          {/* Sorting options */}
          <div className="w-full sm:w-[200px] md:w-[250px] sm:-translate-y-2">
            <Select onValueChange={(value) => setSortOrder(value as SortOrder)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="z-20 max-h-60 overflow-auto">
                <SelectItem value="volume-desc">Volume: High to Low</SelectItem>
                <SelectItem value="volume-asc">Volume: Low to High</SelectItem>
                <SelectItem value="name-asc">Name: A-Z</SelectItem>
                <SelectItem value="name-desc">Name: Z-A</SelectItem>
                <SelectItem value="crypto-asc">
                  Volume (N): Low to High
                </SelectItem>
                <SelectItem value="crypto-desc">
                  Cryptos (N): High to Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Exchange Cards */}
        <div className="grid mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentExchanges.map((exchange) => (
            <ExchangeCard
              key={exchange.id}
              id={exchange.id}
              name={exchange.name}
              tradingVolume={exchange.trade_volume_24h_btc}
              tradeVolumeN={exchange.trade_volume_24h_btc_normalized}
              image={exchange.image}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination>
          <PaginationContent className="flex flex-wrap justify-center gap-2">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => paginate(currentPage - 1)}
                aria-disabled={currentPage === 1}
                className="px-3 py-1"
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 ${currentPage === index + 1 ? "active" : ""}`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => paginate(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
                className="px-3 py-1"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default ExchangesPage;
