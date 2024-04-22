import React, { useState } from 'react';
import { postUrl } from '../../apiCalls';

// form title dupes fixed, onchange(s) updated to include inputs/states, handleSubmit uses added post functionality to actually send data
function UrlForm({ setUrls }) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    postUrl({ title, long_url: urlToShorten })
      .then(newUrl => setUrls(urls => [...urls, newUrl]))
      .catch(error => console.error('Error posting URL:', error));
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
    </form>
  )
}

export default UrlForm;
