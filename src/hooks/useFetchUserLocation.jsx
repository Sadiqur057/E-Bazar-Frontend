import { setCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const useFetchUserLocation = () => {
  const [location, setLocation] = useState(() => getCookie("loc_ebazar") || null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(
          `https://api.ipapi.com/api/check?access_key=${process.env.NEXT_PUBLIC_IPAPI_ACCESS_KEY}`
        );
        const data = await res.json();
        console.log("Fetched location data:", data);
        if (data && data.country_code) {
          setCookie("loc_ebazar", data.country_code);
          setLocation(data.country_code);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    if (!location) {
      fetchLocation();
    }
  }, [location]);

  return { location };
};

export default useFetchUserLocation;
