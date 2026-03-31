import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return null;
}
import Home from "./pages/Home";
import BuyerPage from "./pages/Buyer";
import SellerPage from "./pages/Seller";
import ContactPage from "./pages/Contact";
import NeighborhoodsPage from "./pages/Neighborhoods";
import MarketPage from "./pages/Market";
import MortgagePage from "./pages/Mortgage";
import BlogPage from "./pages/Blog";
import AboutPage from "./pages/About";
import SearchPage from "./pages/Search";
import SoldPage from "./pages/Sold";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Buyer routes */}
      <Route path="/buy" component={BuyerPage} />
      <Route path="/buyer" component={BuyerPage} />
      {/* Seller routes */}
      <Route path="/sell" component={SellerPage} />
      <Route path="/seller" component={SellerPage} />
      {/* Expired listing prospecting */}
      <Route path="/sold" component={SoldPage} />
      {/* Contact */}
      <Route path="/contact" component={ContactPage} />
      {/* Neighborhoods — index and detail */}
      <Route path="/neighborhoods/:slug" component={NeighborhoodsPage} />
      <Route path="/neighborhoods" component={NeighborhoodsPage} />
      {/* Market Reports */}
      <Route path="/market" component={MarketPage} />
      {/* Mortgage Calculator */}
      <Route path="/mortgage" component={MortgagePage} />
      {/* Blog — index and articles */}
      <Route path="/blog/:slug" component={BlogPage} />
      <Route path="/blog" component={BlogPage} />
      {/* About */}
      <Route path="/about" component={AboutPage} />
      {/* Search */}
      <Route path="/search" component={SearchPage} />
      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
