import { Route, Routes } from "react-router-dom";
// components
import { Header } from "./components";
// pages
import { HomePage, LoginPage } from "./pages";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/*' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </>
    );
}

export default App;
