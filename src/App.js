import { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
import { Container } from "@mui/material";

const BASE_URL = "https://v6.exchangerate-api.com/v6/";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/${apiKey}/latest/UAH`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrencyOptions([...Object.keys(data.conversion_rates)]);
      });
  }, []);

  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/${apiKey}/pair/${fromCurrency}/${toCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setExchangeRate(data.conversion_rate);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <Container
      maxWidth="lg"
      className="App"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            amount={fromAmount}
            onChangeAmount={handleFromAmountChange}
          />
          =
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            amount={toAmount}
            onChangeAmount={handleToAmountChange}
          />
        </>
      )}
    </Container>
  );
}

export default App;
