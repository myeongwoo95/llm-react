import Layout from "./components/layout/Layout";
import AppRoutes from "./components/routes/AppRoutes";
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
