import React, { useEffect, useState } from 'react';
import { IMeal } from '../../types';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import axiosAPI from '../../axiosAPI.ts';
import { useNavigate, useParams } from 'react-router-dom';

const initialForm = {
  mealType: '',
  text: '',
  date: '',
  calories: 0
};

const mealTypes = [
  { name: 'Breakfast', label: 'breakfast', id: 1 },
  { name: 'Snack', label: 'snack', id: 2 },
  { name: 'Lunch', label: 'lunch', id: 3},
  { name: 'Dinner', label: 'dinner', id: 4 },
];

const CalorieForm = () => {
  const [meal, setMeal] = useState<IMeal>(initialForm);
  const navigate = useNavigate();
  const {id} = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setMeal((prevState) => ({
      ...prevState,
      [name]: name === 'calories' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        console.log(meal);
        await axiosAPI.put(`/meals/${id}.json`, meal);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await axiosAPI.post(`/meals.json`, meal);
        navigate("/");
      } catch (error) {
        console.error(error);
      } finally {
        setMeal(initialForm);
      }
    }
  };

  const GetMealFromDB = async () => {
    if (id) {
      try {
        const response = await axiosAPI.get(`/meals/${id}.json`);
        if (response.data) {
          setMeal(response.data);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setMeal(initialForm);
    }
  };

  useEffect(() => {
    void GetMealFromDB();
  }, [id]);

  return (
    <Box
      sx={{maxWidth: 400, mx: 'auto', p: 3, border: '1px solid #ccc', borderRadius: 2}}
      component="form"
      onSubmit={handleSubmit}
    >

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Type of meal</InputLabel>
        <Select
          name="mealType"
          value={meal.mealType}
          onChange={handleChange}
          variant="outlined"
        >
          {mealTypes.map((meal) => (
            <MenuItem key={meal.id} value={meal.label}>
              {meal.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Meal description"
        name="text"
        value={meal.text}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Typography variant="h6" sx={{mb: 2}}>
        Select date
      </Typography>

      <TextField
        type="datetime-local"
        name="date"
        value={meal.date}
        onChange={handleChange}
        fullWidth
        sx={{mb: 2}}
      />

      <TextField
        label="Calories"
        type="number"
        name="calories"
        value={meal.calories}
        onChange={handleChange}
        fullWidth
        sx={{mb: 2}}
      />

      <Button type="submit" variant="contained" color="primary"  fullWidth>
        Save
      </Button>
    </Box>
  );
};
export default CalorieForm;