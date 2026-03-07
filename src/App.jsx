
import { Route, Routes } from 'react-router-dom';
import Home from './components/LotteryGame';


function App() {
    return (
      <Routes>
        <Route index element={<Home />} />
        <Route path='/game' element={<Home />} />
      </Routes>
    )
}

export default App
