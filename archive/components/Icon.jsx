import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ icon, ...props }) => {
  const [importedIcon, setImportedIcon] = useState(null);

  useEffect(() => {
    // Dynamically import the icon
    import('@fortawesome/free-solid-svg-icons').then(module => {
      const iconObject = module[icon];
      setImportedIcon(iconObject || null);
    });
  }, [icon]);

  if (!importedIcon) {
    return null;
  }

  return <FontAwesomeIcon icon={importedIcon} {...props} />;
};

export default Icon;
