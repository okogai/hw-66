import { IMealFromDB } from "../../types";
import React from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface MealCardProps {
  meal: IMealFromDB;
  onDelete: (id: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onDelete }) => {
  return (
    <Card
      sx={{
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography color="text.secondary">
          <strong>Created on:</strong>{" "}
          {dayjs(meal.date).format("DD.MM.YYYY HH:mm")}
        </Typography>
        <Typography variant="h5" component="div">
          {meal.mealType}
        </Typography>
        <Typography color="text.secondary">{meal.text}</Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mx: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          <strong>{meal.calories}</strong> <span>Kcal</span>
        </Typography>
      </Box>
      <CardActions>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/meal/edit/${meal.id}`}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => onDelete(meal.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default MealCard;
