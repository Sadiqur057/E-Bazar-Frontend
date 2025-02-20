"use client";
import { useState } from "react";
import Image from "next/image";

const MyImage = ({ src, alt, classNames }) => {
  const [error, setError] = useState(false);

  return error ? (
    <img
      src="https://i.postimg.cc/CxN38v9w/fallback.png"
      alt="Fallback"
      width={200}
      height={200}
      className={classNames}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={200}
      height={200}
      className={classNames}
      onError={() => setError(true)}
    />
  );
};

export default MyImage;
