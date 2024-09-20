import { Box, Grow, Typography } from "@mui/material";

const Header = ({ USDRate, EURRate }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 24px",
        backgroundColor: "#303030",
        border: "2px solid #595959",
        color: "#e4e4e4",
        height: "58px"
      }}
    >
      <Box
        sx={{
          height: "42px",
          width: "42px",
          background: "no-repeat center url(/images/logo.png)",
          backgroundSize: 'contain',
          borderRadius: '50%'
        }}
      />
      <Box>
        <Typography
          sx={{
            fontSize: "18px",
          }}
        >
          $ {USDRate} / € {EURRate}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
