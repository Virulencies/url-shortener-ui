import React from 'react';
import './UrlContainer.css';
import { deleteUrl } from '../../apiCalls';

// added delete handler

const UrlContainer = ({ urls, setUrls }) => {
  const handleDelete = (id) => {
    deleteUrl(id).then(() => {
      setUrls(currentUrls => currentUrls.filter(url => url.id !== id));
    }).catch(error => console.error('Delete failed', error));
  };

  const urlEls = urls.map(url => {
    return (
      
      <div className="url">
        <h3>{url.title}</h3>
        <a href={url.short_url} target="blank">{url.short_url}</a>
        <p>{url.long_url}</p>
        <button onClick={() => handleDelete(url.id)}>Delete</button>
      </div>
    );
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
