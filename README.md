# Word Frequencies Histogram

This is a React.js frontend application that fetches the contents of a text file, calculates the word frequencies, and displays a histogram chart of the 20 most occurring words. It also provides an option to export the word frequencies as a CSV file.

## Features

### Fetching Text Data

The application uses the `axios` library to make an HTTP GET request to retrieve the contents of a text file from [https://www.terriblytinytales.com/test.txt](https://www.terriblytinytales.com/test.txt). The fetched text data will be used to calculate the word frequencies.

### Word Frequency Calculation

After fetching the text data, the application processes it to count the frequency of occurrence for each word. It splits the text into individual words using a regular expression (`/\s+/`), and then iterates over the words to build a word frequency object. The object keeps track of how many times each word appears in the text.

### Histogram Chart Display

The application uses the `react-chartjs-2` library, which is a React wrapper for the popular charting library Chart.js, to display a histogram chart. The chart visualizes the word frequencies of the 20 most occurring words. It shows the number of occurrences of each word on the y-axis, and the words themselves on the x-axis.

### Exporting Word Frequencies

The application provides an "Export" button that allows you to download the word frequencies as a CSV file. When you click the button, the application converts the word frequency data into CSV format and creates a Blob object with the content. It then uses the `file-saver` library to save the Blob as a CSV file on the client-side. The downloaded file will be named `myData.csv`.

## Libraries and Plugins Used

- [React](https://reactjs.org/): A popular JavaScript library for building user interfaces.
- [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2): A React wrapper for Chart.js that enables easy integration of charts into React applications.
- [axios](https://github.com/axios/axios): A promise-based HTTP client that simplifies making API requests.
- [file-saver](https://github.com/eligrey/FileSaver.js/): A library that provides an easy way to save files on the client-side.

### Each line of code explaination step by step
#################################################################
import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver';

import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

 This section imports the necessary dependencies for our application:
React and useState are imported from the 'react' library to enable the use of React components and state management.
axios is imported to make HTTP requests and fetch the text data.
Bar is imported from 'react-chartjs-2' to display the histogram chart.
saveAs is imported from 'file-saver' to enable file downloading functionality.
ChartJS and registerables are imported from 'chart.js' to register the necessary plugins for Chart.js.
####################################################################
const Histogram = () => {
  const [wordFrequencies, setWordFrequencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistogram, setShowHistogram] = useState(false);
  
  This section defines a functional component called Histogram. It uses the useState hook from React to define three state variables:
wordFrequencies: Stores an array of word frequencies. Each entry in the array is a tuple containing a word and its frequency.
isLoading: Represents the loading state of the application.
showHistogram: Indicates whether the histogram chart should be displayed.

#####################################################################
const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      const data = response.data;

      // Count word frequencies
      const wordCounts = {};
      const words = data.split(/\s+/);
      words.forEach((word) => {
        if (wordCounts[word]) {
          wordCounts[word] += 1;
        } else {
          wordCounts[word] = 1;
        }
      });

      // Sort word frequencies in descending order
      const sortedFrequencies = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);

      setWordFrequencies(sortedFrequencies);
      setShowHistogram(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };


This section defines an asynchronous function fetchData. It is responsible for fetching the text data, calculating the word frequencies, and updating the state variables accordingly.
Inside the function:
setIsLoading(true) sets the loading state to true to indicate that the data is being fetched.
The axios.get method is used to make an HTTP GET request to the specified URL (https://www.terriblytinytales.com/test.txt) and retrieve the text data.
The text data is then processed to count the frequency of occurrence for each word. This is done by splitting the text into individual words using a regular expression (/\s+/) and building a word frequency object (wordCounts).
The Object.entries method is used to convert the word frequency object into an array of key-value pairs, which can be easily sorted.
The word frequencies are sorted in descending order based on their occurrence count using the sort method, and only the top 20 entries are selected using the slice method.
