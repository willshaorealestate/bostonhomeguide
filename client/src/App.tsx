import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation, type RouteComponentProps } from "wouter";
import { Suspense, useEffect, type ComponentType } from "react";
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
type PageProps = RouteComponentProps;
type PageModule = { default: ComponentType<PageProps> };

// A code-split page whose chunk can be loaded ahead of time. Once loaded it renders
// synchronously, so main.tsx can load the current page before the first render and
// React never shows a Suspense fallback over the prerendered HTML.
function lazyPage(load: () => Promise<PageModule>) {
  let Loaded: ComponentType<PageProps> | null = null;
  let pending: Promise<void> | null = null;
  const preload = () =>
    (pending ??= load().then((m) => {
      Loaded = m.default;
    }));
  function Page(props: PageProps) {
    if (!Loaded) throw preload();
    return <Loaded {...props} />;
  }
  return Object.assign(Page, { preload });
}

const Home = lazyPage(() => import("./pages/Home"));
const BuyerPage = lazyPage(() => import("./pages/Buyer"));
const SellerPage = lazyPage(() => import("./pages/Seller"));
const ContactPage = lazyPage(() => import("./pages/Contact"));
const NeighborhoodsPage = lazyPage(() => import("./pages/Neighborhoods"));
const MarketPage = lazyPage(() => import("./pages/Market"));
const MortgagePage = lazyPage(() => import("./pages/Mortgage"));
const BlogPage = lazyPage(() => import("./pages/Blog"));
const AboutPage = lazyPage(() => import("./pages/About"));
const SearchPage = lazyPage(() => import("./pages/Search"));
const SoldPage = lazyPage(() => import("./pages/Sold"));
const PrivacyPolicyPage = lazyPage(() => import("./pages/PrivacyPolicy"));
const TermsPage = lazyPage(() => import("./pages/Terms"));

const ROUTES: Array<[path: string, page: ComponentType<PageProps>]> = [
  ["/", Home],
  ["/buy", BuyerPage],
  ["/buyer", BuyerPage],
  ["/sell", SellerPage],
  ["/seller", SellerPage],
  ["/sold", SoldPage], // expired-listing prospecting landing page
  ["/contact", ContactPage],
  ["/neighborhoods/:slug", NeighborhoodsPage],
  ["/neighborhoods", NeighborhoodsPage],
  ["/market", MarketPage],
  ["/mortgage", MortgagePage],
  ["/blog/:slug", BlogPage],
  ["/blog", BlogPage],
  ["/about", AboutPage],
  ["/search", SearchPage],
  ["/privacy-policy", PrivacyPolicyPage],
  ["/terms", TermsPage],
  ["/404", NotFound],
];

const PAGES = [
  Home, BuyerPage, SellerPage, ContactPage, NeighborhoodsPage, MarketPage, MortgagePage,
  BlogPage, AboutPage, SearchPage, SoldPage, PrivacyPolicyPage, TermsPage,
];

/** Loads the code for the page at `pathname` (call before the first render). */
export function preloadPageFor(pathname: string): Promise<void> {
  const match = ROUTES.find(([path]) =>
    new RegExp(`^${path.replace(/:[^/]+/g, "[^/]+")}/?$`).test(pathname)
  );
  const page = match?.[1];
  return page && "preload" in page ? (page as ReturnType<typeof lazyPage>).preload() : Promise.resolve();
}

/** Loads every page's code in the background so later navigation is instant. */
export function preloadAllPages() {
  PAGES.forEach((page) => page.preload());
}

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F4]" />}>
      <Switch>
        {ROUTES.map(([path, page]) => (
          <Route key={path} path={path} component={page} />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
