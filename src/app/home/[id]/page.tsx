/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
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
import { useTheme } from "next-themes";

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
  const { theme } = useTheme(); // Access the current theme

  useEffect(() => {
    const adjustPointCount = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setPointCount(15); // Smaller screens: Fewer points
      } else if (width < 1024) {
        setPointCount(22); // Medium screens: Moderate points
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

        const step = Math.ceil(prices.length / pointCount);
        return prices.filter((_: any, index: number) => index % step === 0);
      } catch (error) {
        console.error(`Error fetching data for coin ID: ${id}`, error);
        return [];
      }
    },
    [pointCount]
  );

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

      const analysisData = await fetchCryptoAnalysis(id, days);

      if (analysisData.length === 0) {
        setChartData(null);
      } else {
        const labels = analysisData.map((entry: { date: any }) => entry.date);
        const prices = analysisData.map((entry: { price: any }) => entry.price);

        setChartData({
          labels,
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              borderColor: theme === "dark" ? "#4A90E2" : "#75BEE9", // Blue line for dark mode
              backgroundColor: theme === "dark" ? "rgba(74, 144, 226, 0.2)" : "rgba(117, 190, 233, 0.2)",
              fill: true,
              borderWidth: 2,
              pointRadius: 3,
            },
          ],
        });
      }

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
  }, [id, days, fetchCryptoAnalysis, theme]);

  return (
    <div className="p-6 w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-4 mt-20 sm:mt-24">
        Cryptocurrency Analysis: {cryptoDetails?.name} (
        {cryptoDetails?.symbol.toUpperCase()})
      </h1>

      {cryptoDetails && (
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-md text-white overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${cryptoDetails.image})`,
              backgroundSize: "250px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom -10%",
              opacity: 0.2,
              transform: "rotate(5deg)",
              zIndex: 0,
            }}
          />

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

      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: theme === "dark" ? "#FFFFFF" : "#000000",
                },
              },
              title: {
                display: true,
                text: `Price Trend for ${cryptoDetails?.name} (Last ${days} Days)`,
                color: theme === "dark" ? "#FFFFFF" : "#000000",
              },
            },
            scales: {
              x: {
                ticks: {
                  color: theme === "dark" ? "#FFFFFF" : "#000000",
                },
                grid: {
                  color: theme === "dark" ? "#333333" : "#CCCCCC",
                },
              },
              y: {
                ticks: {
                  color: theme === "dark" ? "#FFFFFF" : "#000000",
                },
                grid: {
                  color: theme === "dark" ? "#333333" : "#CCCCCC",
                },
              },
            },
          }}
          className={`p-4 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        />
      ) : (
        <p className="text-gray-600">No historical price data available.</p>
      )}
    </div>
  );
};

export default CryptoAnalysisPage;
