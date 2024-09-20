import { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
import { CircularProgress, Container, Box, Typography } from "@mui/material";
import Header from "./components/Header";

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
  const [USDRate, setUSDRate] = useState();
  const [EURRate, setEURRate] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/${apiKey}/latest/UAH`)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyOptions([...Object.keys(data.conversion_rates)]);
        setUSDRate((1 / data.conversion_rates.USD).toFixed(2));
        setEURRate((1 / data.conversion_rates.EUR).toFixed(2));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
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

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <Box
      className="App"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header USDRate={USDRate} EURRate={EURRate} />
      <Container
        maxWidth="lg"
        className="App"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography variant="h1" fontSize="32px" mb="30px">
          Currency Converter
        </Typography>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <Typography sx={{ fontSize: "24px" }}>=</Typography>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
      </Container>
    </Box>
  );
}

export default App;
