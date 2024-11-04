import CalorieForm from './components/CalorieForm/CalorieForm.tsx';
import MealList from './components/MealList/MealList.tsx';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.tsx';
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <>
      <header>
        <NavBar/>
      </header>
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route path="/" element={<MealList/>} />
        <Route path="/meal/add" element={<CalorieForm />} />
        <Route path="/meal/edit/:id" element={<CalorieForm />} />
        <Route
          path="*"
          element={<h1 className="text-center">Page Not Found</h1>}
        />
      </Routes>
    </>
  )
};

export default App
