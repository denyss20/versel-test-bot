import { createBrowserRouter, RouterProvider } from "react-router-dom";

import GamePage from "@ui/pages/game/GamePage";
import StatsPage from "@ui/pages/StatsPage";
import TasksPage from "@ui/pages/TasksPage";
import WalletPage from "@ui/pages/WalletPage";
import AuctionPage from "@ui/pages/AuctionPage";
import BottomBar from "@ui/components/bottom-bar/BottomBar";

// Layout component that includes the BottomBar
const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <BottomBar />
  </>
);

const Routes = () => {
  const publicRoutes = [
    {
      path: "/",
      element: (
        <Layout>
          <GamePage />
        </Layout>
      ),
    },
    {
      path: "/stats",
      element: (
        <Layout>
          <StatsPage />
        </Layout>
      ),
    },
    {
      path: "/wallet",
      element: (
        <Layout>
          <WalletPage />
        </Layout>
      ),
    },
    {
      path: "/tasks",
      element: (
        <Layout>
          <TasksPage />
        </Layout>
      ),
    },
    {
      path: "/auction",
      element: (
        <Layout>
          <AuctionPage />
        </Layout>
      ),
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      children: publicRoutes,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
