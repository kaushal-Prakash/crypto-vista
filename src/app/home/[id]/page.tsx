/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CryptoAnalysisPage: React.FC = () => {
  const { id } = useParams() as { id: string }; // Get the `id` dynamically from route parameters
  const [chartData, setChartData] = useState<any>(null);
  const [marketCapData, setMarketCapData] = useState<any>(null);
  const [days, setDays] = useState<string>('30'); // Default to 30 days
  const [cryptoDetails, setCryptoDetails] = useState<any>(null);

  // Fetch historical price data
  const fetchCryptoAnalysis = async (id: string, days: string) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days,
          },
        }
      );

      const data = response.data;
      return data.prices.map(([timestamp, price]: [number, number]) => ({
        date: new Date(timestamp).toLocaleDateString('en-US'),
        price,
      }));
    } catch (error) {
      console.error(`Error fetching data for coin ID: ${id}`, error);
      return [];
    }
  };

  // Fetch coin details for pie chart
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
              label: 'Price (USD)',
              data: prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
        });

        setMarketCapData({
          labels: ['Market Cap', 'Other'],
          datasets: [
            {
              label: 'Market Cap',
              data: [details.market_data.market_cap.usd, 1],
              backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
              borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        });
      }
    };

    loadAnalysis();
  }, [id, days]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>
        Cryptocurrency Analysis: {cryptoDetails?.name} ({cryptoDetails?.symbol.toUpperCase()})
      </h1>

      {/* Day Selector */}
      <div style={{ marginBottom: '20px' }} className='mt-24'>
        <label htmlFor="days">Select Days: </label>
        <select
          id="days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="p-2 border rounded"
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
                position: 'top',
              },
              title: {
                display: true,
                text: `Price Trend for ${cryptoDetails?.name} (Last ${days} Days)`,
              },
            },
          }}
        />
      ) : (
        <p>No historical price data available.</p>
      )}

      {/* Market Cap Pie Chart */}
      {marketCapData && (
        <div style={{ marginTop: '50px' }}>
          <h2>Market Cap Distribution</h2>
          <Pie
            data={marketCapData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Market Cap vs Other Distribution',
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CryptoAnalysisPage;
