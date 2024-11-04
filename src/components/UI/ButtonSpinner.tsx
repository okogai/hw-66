import { CircularProgress } from "@mui/material";

const ButtonSpinner = () => {
  return (
    <CircularProgress
      size={32}
      thickness={5}
      sx={{ position: "absolute", color: "white" }}
    />
  );
};

export default ButtonSpinner;
