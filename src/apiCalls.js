// missing post function and error handling

export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch URLs.');
          }
          return response.json();
      });
}


export const postUrl = (urlData) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(urlData)
  })
  .then(response => response.json().then(data => {
    if (!response.ok) {
        throw new Error(data.message || 'Failed to post URL.');
    }
    return data;
  }));
}