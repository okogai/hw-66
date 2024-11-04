import { IMealFromDB } from '../../types';
import React from 'react';
import dayjs from "dayjs";
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

interface MealCardProps {
  meal: IMealFromDB;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void
}

const MealCard: React.FC<MealCardProps> = ({meal, onEdit, onDelete}) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {meal.mealType}
        </Typography>
        <Typography color="text.secondary">
          {meal.text}
        </Typography>
        <Typography color="text.secondary">
          {dayjs(meal.date).format("DD.MM.YYYY HH:mm")}
        </Typography>
        <Typography color="text.secondary">
          Calories: {meal.calories}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(meal.id)}>
          Edit
        </Button>
        <Button size="small" color="secondary"  onClick={() => onDelete(meal.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default MealCard;