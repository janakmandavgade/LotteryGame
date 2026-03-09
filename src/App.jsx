
import { Route, Routes } from 'react-router-dom';
import Home from './components/LotteryGame';
import Login from './components/Login';
import SignUp from './components/SignUpPage';
import Results from './components/Results';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
      <Routes>
        <Route index element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        {/* <Route path='/game' element={<Home />} /> */}
        {/* <Route path='/results' element={<Results />} /> */}
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
      </Routes>
    )
}

export default App
