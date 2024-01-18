function updateQueryParams(queryObj) {
  const queryParams = new URLSearchParams(window.location.search);

  // Update query parameters based on the queryObj
  Object.keys(queryObj).forEach((key) => {
    if (queryObj[key] !== undefined && queryObj[key] !== null && queryObj[key] !== "") {
      queryParams.set(key, queryObj[key]);
    } else {
      queryParams.delete(key); // Remove the parameter if value is empty
    }
  });

  const newUrl = `?${queryParams.toString()}`;

  // Push the state into browser's history without full navigation
  window.history.pushState({ filters: queryParams.toString() }, '', newUrl);
}

function handlePopState(queryObj) {
  return (event) => {
    if (event.state && event.state.filters) {
      const newQueryParams = new URLSearchParams(event.state.filters);

      // Update the queryObj based on history state
      const updatedQueryObj = {};
      Object.keys(queryObj).forEach((key) => {
        if (newQueryParams.has(key)) {
          updatedQueryObj[key] = newQueryParams.get(key);
        } else {
          updatedQueryObj[key] = queryObj[key]; // Keep the original value if not present in history
        }
      });

      // Call a provided callback to handle updated queryObj
      if (typeof queryObj.onUpdate === 'function') {
        queryObj.onUpdate(updatedQueryObj);
      }
    }
  };
}

function simpleQueryParams(queryObj) {
  const queryParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
      queryParams.set(key, params[key]);
    }
  });

  const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  window.history.pushState(null, '', newUrl);
}

export { updateQueryParams, handlePopState, simpleQueryParams };
