import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getUrls().then(data => {
      if (data.urls) {
        setUrls(data.urls);
        setError('');  
      }
    })
    .catch(err => {
      setError('Failed to fetch URLs.');  
      console.error('Error fetching URLs:', err);
    });
  }, []);


  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm setUrls={setUrls}/> 
      </header>
      {error && <p className="error">{error}</p>}
      <UrlContainer urls={urls} setUrls={setUrls}/>
    </main>
  );
}

export default App;
