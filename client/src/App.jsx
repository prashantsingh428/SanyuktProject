import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Footer from "./components/Footer";
import MainRoutes from "./routes/MainRoutes";
import { Toaster } from 'react-hot-toast';

const PUBLIC_HEADER_OFFSET = {
  xs: '102px', // 60px header + ~42px subheader
  md: '122px', // 80px header + ~42px subheader
};

const App = () => {
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAccountRoute = location.pathname.startsWith("/my-account");

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {!isAdminRoute && (
        <>
          <Header />
          <SubHeader />
        </>
      )}
      <Box sx={{ pt: !isAdminRoute ? PUBLIC_HEADER_OFFSET : 0 }}>
        <MainRoutes />
      </Box>
      {!isAdminRoute && !isAccountRoute && <Footer />}
    </>
  );
};

export default App;
