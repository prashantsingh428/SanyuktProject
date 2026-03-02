import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <Box sx={{ pt: !isAdminRoute ? { xs: '60px', md: '80px' } : 0 }}>
        <MainRoutes />
      </Box>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;