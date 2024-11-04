import { IMealFromDB } from '../../types';
import { useEffect, useState } from 'react';
import axiosAPI from '../../axiosAPI.ts';
import Loader from '../Loader/Loader.tsx';
import MealCard from '../MealCard/MealCard.tsx';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MealList = () => {
  const [meals, setMeals] = useState<IMealFromDB[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getMealsFromDB = async () => {
    setLoading(true);
    try {
      const response = await axiosAPI('/meals.json');
      if (response.data) {
        const mealsArray: IMealFromDB[] = Object.keys(response.data).map(key => ({
          id: key,
          ...response.data[key],
        }));
        setMeals(mealsArray);
        setTotalCalories(mealsArray.reduce((sum, meal) => sum + meal.calories, 0));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const DeleteMealFromDB = async (id: string) => {
    setLoading(true);
    try {
      await axiosAPI.delete(`/meals/${id}.json`);
      setMeals(prevState => prevState.filter(meal => meal.id !== id));
      await getMealsFromDB();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getMealsFromDB();
  }, [location.pathname]);

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        my={3}
        p={2}
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6">Total Calories Today: {totalCalories} kcal</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/meal/add"
        >
          Add new meal
        </Button>
      </Box>

      {loading ? (
        <Loader/>
      ) : meals.length > 0 ? (
        meals.map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            onDelete={() => DeleteMealFromDB(meal.id)}
          />
        ))
      ) : (
        <Typography variant="body1" color="textSecondary" align="center" mt={4}>
          No meals found.
        </Typography>
      )}
    </Container>
  );
};

export default MealList;