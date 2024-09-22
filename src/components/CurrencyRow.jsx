import { Box, MenuItem, Select, TextField } from '@mui/material';

const CurrencyRow = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
      <TextField label="Amount" type="number" value={amount ?? ''} onChange={onChangeAmount} sx={{ flex: '1 0 65%' }} />
      <Select label={<>Currency</>} value={selectedCurrency ?? ''} onChange={onChangeCurrency} sx={{ minWidth: '25%' }}>
        {currencyOptions?.map((option) => (
          <MenuItem key={`${option}-key-option`} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default CurrencyRow;
