import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./MyRoutes";
import { MyContextProvider } from "./hooks/MyContext";
import { MythemesContextProvider } from "./hooks/MyThemesContext";

const App = () => {
  return (
    <MythemesContextProvider>
      <MyContextProvider>
        <BrowserRouter>
          <MyRoutes />
        </BrowserRouter>
      </MyContextProvider>
    </MythemesContextProvider>
  );
};

export default App;