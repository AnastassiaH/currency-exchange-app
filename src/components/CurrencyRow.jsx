import { Box, MenuItem, Select, TextField } from "@mui/material";

const CurrencyRow = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="jnsdasd"
    >
      <TextField type="number" value={amount} onChange={onChangeAmount} />
      <Select
        value={selectedCurrency}
        onChange={onChangeCurrency}
        sx={{
          width: 100,
          marginLeft: 2,
        }}
      >
        {currencyOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default CurrencyRow;
