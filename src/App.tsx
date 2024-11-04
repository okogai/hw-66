import CalorieForm from './components/CalorieForm/CalorieForm.tsx';
import MealList from './components/MealList/MealList.tsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <>
      <CalorieForm />
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
