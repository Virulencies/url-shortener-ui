import React, { useState } from 'react';
import { postUrl } from '../../apiCalls';

// form title dupes fixed, onchange(s) updated to include inputs/states, handleSubmit uses added post functionality to actually send data
// also added/corrected error handling for sad paths
function UrlForm({ setUrls }) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = e => {
    e.preventDefault();
    if (!urlToShorten || !title) {
      setError('Missing long_url in request.');
      return;
    }
    postUrl({ title, long_url: urlToShorten })
      .then(newUrl => {
        setUrls(urls => [...urls, newUrl]);
        setError('');
      })
      .catch(error => setError(error.message));
    clearInputs();
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type='text'
        placeholder='URL to Shorten...'
        name='urlToShorten'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}
      />
      <button type="submit">
        Shorten Please!
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default UrlForm;
