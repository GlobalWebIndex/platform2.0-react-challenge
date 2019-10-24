import React from "react";
import { CatLoverAppProvider } from "./CatLoverAppContext"
import MainLayout from "./components/MainLayout"


const App: React.FC = () => {
  return (
    <CatLoverAppProvider>
     <MainLayout/>
    </CatLoverAppProvider>
  );
};

export default App;
