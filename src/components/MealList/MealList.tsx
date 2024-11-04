import { IMealFromDB } from "../../types";
import { useEffect, useState } from "react";
import axiosAPI from "../../axiosAPI.ts";
import Loader from "../Loader/Loader.tsx";
import MealCard from "../MealCard/MealCard.tsx";
import { Box, Container, Typography } from "@mui/material";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const MealList = () => {
  const [meals, setMeals] = useState<IMealFromDB[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getMealsFromDB = async () => {
    setLoading(true);
    try {
      const response = await axiosAPI("/meals.json");
      if (response.data) {
        const mealsArray: IMealFromDB[] = Object.keys(response.data).map(
          (key) => ({
            id: key,
            ...response.data[key],
          }),
        );

        mealsArray.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());

        setMeals(mealsArray);
        const today = dayjs().startOf("day").format("YYYY-MM-DD");

        const todayMeals = mealsArray.filter(
          (meal) => dayjs(meal.date).format("YYYY-MM-DD") === today,
        );

        setTotalCalories(
          todayMeals.reduce((sum, meal) => sum + meal.calories, 0),
        );
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

      setMeals((prevMeals) => {
        const updatedMeals = prevMeals.filter((meal) => meal.id !== id);

        const today = dayjs().startOf("day").format("YYYY-MM-DD");
        const todayCalories = updatedMeals
          .filter((meal) => dayjs(meal.date).format("YYYY-MM-DD") === today)
          .reduce((sum, meal) => sum + meal.calories, 0);

        setTotalCalories(todayCalories);
        return updatedMeals;
      });
      toast.success("Meal deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete meal!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getMealsFromDB();
  }, []);

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        my={3}
        p={3}
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5">
          <strong>Total Calories Today:</strong>
        </Typography>
        <Typography variant="h6">{totalCalories} kcal</Typography>
      </Box>

      {loading ? (
        <Loader />
      ) : meals.length > 0 ? (
        meals.map((meal) => (
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
