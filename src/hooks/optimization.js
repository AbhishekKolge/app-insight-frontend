import { useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';

const useFirstRender = () => {
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    setFirstRender(true);
  }, []);

  return { firstRender };
};

export { useFirstRender };
