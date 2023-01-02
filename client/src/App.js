import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';

function App() {
	return (
		<div className='App'>
			<Router>
				<div className='navbar'>
					<Link to='/'> Home Page </Link>
					<Link to='/createpost'> Create A Post </Link>
					<Link to='/post/:id'> Create A Post </Link>
				</div>
				<Routes>
					<Route
						path='/'
						exact
						element={<Home />}
					/>
					<Route
						path='/createpost'
						exact
						element={<CreatePost />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
