import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import './index.css';

import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);


const App = () => {
  const [wordCounts, setWordCounts] = useState(null);

  const fetchWordCounts = async () => {
    try {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      const counts = countWords(response.data);
      setWordCounts(counts);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const countWords = (text) => {
    const words = text.split(/\W+/);
    const counts = {};

    for (let word of words) {
      if (word !== '') {
        const lowercaseWord = word.toLowerCase();
        counts[lowercaseWord] = (counts[lowercaseWord] || 0) + 1;
      }
    }

    return counts;
  };

  const getTopWords = (counts, limit = 20) => {
    const sortedWords = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, limit);
  };

  const handleExport = () => {
    const csvContent = convertToCSV(wordCounts);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'data.csv');
  };

  const convertToCSV = (data) => {
    const rows = Object.entries(data)
      .map(([word, count]) => `${word},${count}`)
      .join('\n');
    return rows;
  };

  const renderChart = () => {
    if (!wordCounts) {
      return null;
    }

    const topWords = getTopWords(wordCounts);
    const labels = topWords.map(([word]) => word);
    const values = topWords.map(([_, count]) => count);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Word Frequency',
          backgroundColor: "#e7bcbc",
          borderColor: "#c1272d",
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75,192,192,0.6)',
          hoverBorderColor: 'rgba(75,192,192,1)',
          data: values,
        },
      ],
    };

    return <Bar data={chartData} />;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Click on Submiit button to see the Histogram below.</h1>
      <div className="d-flex justify-content-center">
        <button className="btn1 btn-primary" onClick={fetchWordCounts}>
          Submit
        </button>
      </div>
      <div className="mt-5">{renderChart()}</div>
      {wordCounts && (
        <div className="d-flex justify-content-center mt-4">
          <button className="btn2 btn-primary" onClick={handleExport}>
            Export
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
