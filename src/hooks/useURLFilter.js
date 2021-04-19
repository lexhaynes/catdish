/* the purpose of this hook is to capture and update URL params */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

const useURLFilter = () => {
  const [brands, setBrands] = useState([]);
  const [textures, setTextures] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [excludes, setExcludes] = useState([]);

  useEffect(() => {
    
  }, []);
}

export default useURLFilter