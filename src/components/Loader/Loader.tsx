import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <CircularProgress
        size={24}
        color="inherit"
        />
    </Box>
  );
};

export default Loader;
