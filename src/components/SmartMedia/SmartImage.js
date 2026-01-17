import React, { useCallback, useState } from 'react';

/**
 * SmartImage
 * - If the image is wide enough (landscape), keep object-contain to avoid heavy cropping.
 * - If the image is portrait/square, switch to object-cover so it fills the frame ("zoom" to fit).
 */
const SmartImage = ({
  src,
  alt,
  className = '',
  landscapeFit = 'contain',
  portraitFit = 'cover',
  landscapeThreshold = 1.0,
  onLoad,
  onError,
  ...props
}) => {
  const [fit, setFit] = useState(landscapeFit);

  const handleLoad = useCallback(
    (e) => {
      const img = e.currentTarget;
      const width = img?.naturalWidth || 0;
      const height = img?.naturalHeight || 0;
      const ratio = height ? width / height : 0;

      const nextFit = ratio >= landscapeThreshold ? landscapeFit : portraitFit;
      setFit(nextFit);

      if (typeof onLoad === 'function') onLoad(e);
    },
    [landscapeFit, portraitFit, landscapeThreshold, onLoad]
  );

  const handleError = useCallback(
    (e) => {
      if (typeof onError === 'function') onError(e);
    },
    [onError]
  );

  const fitClass =
    fit === 'cover'
      ? 'object-cover object-center'
      : fit === 'contain'
        ? 'object-contain'
        : 'object-contain';

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${fitClass}`.trim()}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

export default SmartImage;
