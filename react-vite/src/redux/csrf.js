import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json", and set the "XSRF-TOKEN" header to the value of the
  // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  
  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);
  // const res = await window.fetch("/api/spots");
  
  // if the response status code is 400 or above, then throw an error with the
  // error being the response
  if (res.status >= 400) {
    // Bypass any 401 Forbidden errors from the `/api/auth/` endpoint. 
    if (res.url.endsWith("/api/auth/") && res.status == 401) {
      // In development, send a warning noting that this bypass has occurred.
      if (import.meta.env.MODE !== "production") 
        console.warn("csrf.js: Bypassed 401 Forbidden response from csrfFetch");
    } else {
      // In development, have the console indicate the error has occurred here.
      if (import.meta.env.MODE !== "production") 
        console.error("csrf.js: csrfFetch response error! See below for details");
      throw res;
    }
  }

  // if the response status code is under 400, then return the response to the
  // next promise chain
  return res;
}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
  }