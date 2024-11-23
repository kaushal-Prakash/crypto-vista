/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Image from "next/image";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const CryptoAnalysisPage: React.FC = () => {
  const { id } = useParams() as { id: string }; // Get the `id` dynamically from route parameters
  const [chartData, setChartData] = useState<any>(null);
  const [days, setDays] = useState<string>("30"); // Default to 30 days
  const [cryptoDetails, setCryptoDetails] = useState<any>(null);
  const [pointCount, setPointCount] = useState<number>(30); // Default number of points

  // Adjust the number of points dynamically based on screen size
  useEffect(() => {
    const adjustPointCount = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setPointCount(10); // Smaller screens: Fewer points
      } else if (width < 1024) {
        setPointCount(20); // Medium screens: Moderate points
      } else {
        setPointCount(30); // Larger screens: Maximum points
      }
    };

    adjustPointCount();
    window.addEventListener("resize", adjustPointCount);

    return () => {
      window.removeEventListener("resize", adjustPointCount);
    };
  }, []);

  // Memoized function to fetch historical price data
  const fetchCryptoAnalysis = useCallback(
    async (id: string, days: string) => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days,
            },
          }
        );

        const data = response.data;
        const prices = data.prices.map(
          ([timestamp, price]: [number, number]) => ({
            date: new Date(timestamp).toLocaleDateString("en-US"),
            price,
          })
        );

        // Reduce points to match the desired pointCount
        const step = Math.ceil(prices.length / pointCount);
        return prices.filter((_: any, index: number) => index % step === 0);
      } catch (error) {
        console.error(`Error fetching data for coin ID: ${id}`, error);
        return [];
      }
    },
    [pointCount] // Dependencies for memoization
  );

  // Fetch coin details
  const fetchCoinDetails = async (id: string) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for coin ID: ${id}`, error);
      return null;
    }
  };

  useEffect(() => {
    const loadAnalysis = async () => {
      if (!id) return;

      // Fetch historical price data
      const analysisData = await fetchCryptoAnalysis(id, days);

      if (analysisData.length === 0) {
        setChartData(null); // Handle case where data is not available
      } else {
        const labels = analysisData.map((entry: { date: any }) => entry.date);
        const prices = analysisData.map((entry: { price: any }) => entry.price);

        setChartData({
          labels,
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        });
      }

      // Fetch coin details
      const details = await fetchCoinDetails(id);
      if (details) {
        setCryptoDetails({
          name: details.name,
          symbol: details.symbol,
          marketCap: details.market_data.market_cap.usd,
          currentPrice: details.market_data.current_price.usd,
          totalVolume: details.market_data.total_volume.usd,
          image: details.image.large,
        });
      }
    };

    loadAnalysis();
  }, [id, days, fetchCryptoAnalysis]); // Dependencies for useEffect

  return (
    <div className="p-6 w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-4 mt-20 sm:mt-24">
        Cryptocurrency Analysis: {cryptoDetails?.name} (
        {cryptoDetails?.symbol.toUpperCase()})
      </h1>

      {/* Coin Details Section */}
      {cryptoDetails && (
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-md text-white overflow-hidden">
          {/* Logo Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${cryptoDetails.image})`,
              backgroundSize: "250px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom -10%",
              opacity: 0.2,
              transform:'rotate(5deg)',
              zIndex: 0,
            }}
          />

          {/* Content Section */}
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <Image
                src={cryptoDetails.image}
                alt={`${cryptoDetails.name} logo`}
                width={60}
                height={60}
                className="rounded-full"
              />
              <h2 className="text-xl font-semibold ml-4">
                {cryptoDetails.name}
              </h2>
            </div>
            <ul className="space-y-2">
              <li>
                <strong>Symbol:</strong> {cryptoDetails.symbol.toUpperCase()}
              </li>
              <li>
                <strong>Market Cap:</strong> $
                {cryptoDetails.marketCap.toLocaleString()}
              </li>
              <li>
                <strong>Current Price:</strong> $
                {cryptoDetails.currentPrice.toLocaleString()}
              </li>
              <li>
                <strong>Total Volume:</strong> $
                {cryptoDetails.totalVolume.toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Day Selector */}
      <div className="my-6 flex items-center">
        <label
          htmlFor="days"
          className="mr-2 text-2xl sm:text-3xl font-semibold"
        >
          Select Days:
        </label>
        <select
          id="days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="p-2 border rounded cursor-pointer"
        >
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
        </select>
      </div>

      {/* Line Chart */}
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `Price Trend for ${cryptoDetails?.name} (Last ${days} Days)`,
              },
            },
          }}
          className="bg-white p-4 rounded-lg shadow-md"
        />
      ) : (
        <p className="text-gray-600">No historical price data available.</p>
      )}
    </div>
  );
};

export default CryptoAnalysisPage;
