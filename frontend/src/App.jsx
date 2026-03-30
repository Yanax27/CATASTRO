import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { checkAuth } from "./modules/auth/authActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <AppRouter />;
};

export default App;