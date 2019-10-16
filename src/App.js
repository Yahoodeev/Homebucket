import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { useMutation } from "@apollo/client";
import { AUTH } from "./ApolloClient/mutations"
import {useUser} from "./context/userContext"

function App() {
  const { setUser } = useUser()
  const [auth, { loading, data, error }] = useMutation(AUTH);

  useEffect(()=>{
    auth()
  },[])

  useEffect(()=>{
    if(data?.auth){
      setUser(data.auth?.user)
      localStorage.setItem("homebucket", data.auth?.token)
    }
  },[data])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/homebucket" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/user" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
