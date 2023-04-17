import React from 'react';
import { Link, Navigate, Route, Routes} from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import NotFound from "./page/NotFound";
import Users from "./Users";
import LoginForm from './page/LoginForm';
import Profile from './page/Profile';
import LogoutButton from './page/LogoutButton';
import { useRecoilValue } from 'recoil';
import PrivateRoute from './auth/PrivateRoute';
import Sidebar from './Sidebar';
//import { useRecoilState } from 'recoil';
import authAtoms from './auth/authatom';
/* import styled from 'styled-components';

const MainWrep = styled.div`
	display: flex;
	justify-content: space-evenly;
	`;
	
	
	const ContentWrapper = styled.div`
	wdith: calc(100% - 200px);
	margin-left: 200px;
` */

function MainPage() {
	const auth = useRecoilValue(authAtoms)
	//const [auth,  = useRecoilState(authAtoms)

	console.log("Main:"+auth);
	const authFromLocalStorage = JSON.parse(localStorage.getItem('auth'));
	if (!authFromLocalStorage)
		return <Navigate to='/login' />;

	const users = () => {
		return <Users />;
	};

	return (
		<div className='MainWrep'>
		<div className='ContentWrapper'>
		<Sidebar />
		<nav>
				<Link to="/">
					<button>Bookjeok Bookjeok</button>
				</Link>
				<Link to="/about">
					<button>About</button>
				</Link>
				<Link to="/users">
					<button>Users</button>
				</Link>
				<Link to="/Profile">
					<button>Profile</button>
				</Link>
				<Link to="/Login">
						<LogoutButton />
				</Link>
		</nav>
			<hr />
			<div>
				<Routes>
					<Route path="/*" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/users/*" element={<PrivateRoute Component={users} />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/login" element={<LoginForm />}/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
		</div>
	);
}

export default MainPage;
