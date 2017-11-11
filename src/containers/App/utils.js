const baseRoute =  'http://localhost:3456';

const fetchData = (params) => {
  const fetchRequest = new Request(`${baseRoute}/api/${params}`, {method: 'get'});
  return fetch(fetchRequest)
    .then((response) => (
      response.json().then((result) => ({ result }))
    ))
    .catch((error) => ({ error }));
};

export default fetchData;