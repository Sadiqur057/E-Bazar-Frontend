import { setCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const useFetchCurrencyData = () => {
  const [currency, setCurrency] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);
  const [symbol, setSymbol] = useState(null);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const savedCurrency = getCookie("currency_data");
        if (savedCurrency) {
          const parsedCurrency = JSON.parse(savedCurrency);
          setCurrency(parsedCurrency.code);
          setSymbol(parsedCurrency.symbol);
          return;
        }

        const currencyResponse = await fetch(process.env.NEXT_PUBLIC_IPDATA_URL);
        const currencyData = await currencyResponse.json();
        const userCurrency = currencyData.currency.code;
        const userSymbol = currencyData.currency.symbol;

        setCurrency(userCurrency);
        setSymbol(userSymbol);
        setCookie("currency_data", JSON.stringify({ code: userCurrency, symbol: userSymbol }));
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrency();
  }, []);

  useEffect(() => {
    if (!currency) return;

    const fetchConversionRate = async () => {
      try {
        const savedRates = getCookie("conversion_rates");
        if (savedRates) {
          const parsedRates = JSON.parse(savedRates);
          setConversionRate(parsedRates[currency] || 1);
          return;
        }

        const rateResponse = await fetch(process.env.NEXT_PUBLIC_CURRENCY_EXCHANGE_URL);
        const rateData = await rateResponse.json();
        const rate = rateData.conversion_rates[currency] || 1;
        setConversionRate(rate);
        setCookie("conversion_rates", JSON.stringify(rateData.conversion_rates));
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };

    fetchConversionRate();
  }, [currency]);

  return { currency, conversionRate, symbol };
};

export default useFetchCurrencyData;
