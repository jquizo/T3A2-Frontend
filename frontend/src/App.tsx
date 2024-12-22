import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";

import Layout from './layouts/Layout';
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Home from "./pages/Home";
import { useAppContext } from "./contexts/AppContext";

  const App = () => {
  const { isLoggedIn } = useAppContext();
    return (
        
      <Router>
        <Routes>
          <Route 
            path="/" element={<Layout><Home/></Layout>}>
          </Route>
          <Route 
            path="/search" element={<Layout>Search</Layout>}>
          </Route>
          <Route 
            path="/register" element={<Layout><Register/></Layout>}>
          </Route>
          <Route 
            path="/sign-in" element={<Layout><SignIn/></Layout>}>
          </Route>
          {isLoggedIn && <>
            <Route 
              path="/add-hotel" 
              element={
              <Layout>
                <AddHotel/>
                </Layout>}
              />
              <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
          </>}
          <Route 
            path="/*" element={<Layout>/</Layout>}>
          </Route>
        </Routes>
      </Router>
    );
  };
  
  export default App;
  