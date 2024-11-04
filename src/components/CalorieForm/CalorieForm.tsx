import React, { useState } from 'react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    console.log(e.target.name);
    setMeal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(meal);
    try {
      await axiosAPI.post(`/meals.json`, meal);
    } catch (error) {
      console.error(error);
    } finally {
      setMeal(initialForm);
    }
  };

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