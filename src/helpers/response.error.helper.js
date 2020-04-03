const returnError = function (event, error) {
  const code = event || '500_internal-error-server';
  const mergeHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Cache-Control': 'private, max-age=0, no-cache, no-store, must-revalidate',
    'Content-Type': 'application/json; charset=utf-8'
  };

  return {
    statusCode: error || 500,
    headers: mergeHeaders,
    body: JSON.stringify({
      error: {
        code,
        message: error.message
      }    
    })
  };
};

const returnSucess = function (body, statusCode = 200, headers = {}) {
  const mergeHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Cache-Control': 'private, max-age=0, no-cache, no-store, must-revalidate',
    'Content-Type': 'application/json; charset=utf-8',
    ...headers, 
  };

  return {
    statusCode,
    headers: mergeHeaders,
    body: JSON.stringify(body)
  };
};

module.exports = {
  returnError,
  returnSucess
};