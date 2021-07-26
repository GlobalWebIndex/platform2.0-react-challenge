import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import ErrorNotification from "./components/ErrorNotification";
import { CacheKeys } from "./constants/constants";
import ErrorProvider from "./context/ErrorProvider";
import DashboardLayout from "./layouts/DashboardLayout";
import { uuid } from "./utilities/utils";

const queryClient = new QueryClient();
const subs_id = uuid();
localStorage.setItem(CacheKeys.SUBS_ID, subs_id);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <DashboardLayout />
        <ErrorNotification />
      </ErrorProvider>
    </QueryClientProvider>
  );
}

export default App;
