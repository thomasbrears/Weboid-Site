import { useEffect } from 'react';

const ExternalRedirect = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null; // No visual output since it's a redirect
};

export default ExternalRedirect;
