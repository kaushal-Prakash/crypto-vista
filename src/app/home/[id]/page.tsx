/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Hook to access params dynamically
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const fetchCryptoAnalysis = async (id: string) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '30', // Fetch last 30 days' data
      },
    });

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

const CryptoAnalysisPage: React.FC = () => {
  const { id } = useParams() as { id: string }; // Get the `id` dynamically from route parameters
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const loadAnalysis = async () => {
      if (!id) return; // Ensure `id` exists
      const analysisData = await fetchCryptoAnalysis(id);

      if (analysisData.length === 0) {
        setChartData(null); // Handle case where data is not available
      } else {
        const labels = analysisData.map((entry: { date: any; }) => entry.date);
        const prices = analysisData.map((entry: { price: any; }) => entry.price);

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
    };

    loadAnalysis();
  }, [id]);


  if (!chartData) {
    return <p>No data available for the selected cryptocurrency.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cryptocurrency Analysis: {id?.toUpperCase()}</h1>
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
              text: `Price Trend for ${id?.toUpperCase()} (Last 30 Days)`,
            },
          },
        }}
      />
    </div>
  );
};

export default CryptoAnalysisPage;
