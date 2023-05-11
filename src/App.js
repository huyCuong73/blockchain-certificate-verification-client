import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useParams,  } from 'react-router-dom';
import GenerateDoc from "./Page/GenerateDoc/GenerateDoc";
import Login from "./Page/Login/Login";
import Management from "./Page/management/Management";
import Register from "./Page/Register/Register";

import "./App.css";
import Verify from "./Page/Verify/Verify";
import { useSelector } from "react-redux";
import IdVerificaton from "./Page/IdVerification/IdVerificaton";
import HomePage from "./Page/HomePage/HomePage";
import Docverification from "./Page/DocVerification/Docverification";
import Cert from "./Page/Cert/Cert";
import Request from "./Page/Request/Request";
import DisplayData from "./components/DispalyData/DisplayData";


function App() {

	const user =  useSelector( state => state.user.user)

	return (

		<Routes>
			<Route path="/" element={<HomePage />} />
			{
				user
				&&
				user.role === "institution"
				&&
				<Route path="/management" element={<Management />} />
			}
			<Route path="/verify" element={<Verify />} />
			<Route path="/data" element={<DisplayData />} />
			<Route path="/request" element={<Request />} />
			<Route path="/verify/id" element={<IdVerificaton />} />
			<Route path="/verify/Document" element={<Docverification />} />
			<Route path="/certificates" element={<Cert />} />
			<Route path="/register" element={!user ? <Register /> : <Navigate replace to = "/" />} />
			<Route path="/login" element={!user ? <Login /> : <Navigate replace to = "/" />} />
			<Route path="/generate" element={<GenerateDoc />} />
		</Routes>

	)
}

export default App;
