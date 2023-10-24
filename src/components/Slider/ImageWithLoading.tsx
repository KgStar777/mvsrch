
import { useState } from 'react';

import { RotatingLines } from 'react-loader-spinner';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import classes from "./Slider.module.css";


export function ImageWithLoading({ src }: { src: string }) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className={classes.loadingImage}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="60"
            visible={loading}
          />
        </div>
      )}
      <img
        src={src}
        alt="Image"
        style={{ display: loading ? 'none' : 'block' }}
        onLoad={handleImageLoad}
      />
    </>
  );
}