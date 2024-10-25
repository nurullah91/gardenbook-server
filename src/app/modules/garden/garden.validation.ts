import { z } from 'zod';

// Garden Plot Design schema
const gardenPlotSchema = z.object({
  plotName: z.string().min(1, 'Plot name is required'),
  layout: z
    .array(
      z.object({
        plantType: z.string().min(1, 'Plant type is required'),
        position: z.object({
          x: z.number().int().min(0, 'Position X must be a positive integer'),
          y: z.number().int().min(0, 'Position Y must be a positive integer'),
        }),
      }),
    )
    .min(1, 'At least one plant must be placed in the plot'),
});

// Plant Growth Tracker schema
const plantGrowthSchema = z.object({
  plantId: z.string().min(1, 'Plant ID is required'),
  growthStage: z.enum(['seed', 'sprout', 'mature'], {
    message: 'Growth stage must be one of: seed, sprout, mature',
  }),
  wateringSchedule: z.object({
    frequency: z.number().min(1, 'Watering frequency must be at least 1 day'),
    lastWatered: z.date().optional(),
  }),
  reminders: z
    .array(
      z.object({
        task: z.string().min(1, 'Reminder task is required'),
        date: z.date(),
      }),
    )
    .optional(),
  harvestDate: z.date().optional(),
});

// Community Interaction schema
const gardenShareSchema = z.object({
  gardenId: z.string().min(1, 'Garden ID is required'),
  userId: z.string().min(1, 'User ID is required'),
  comments: z.string().optional(),
  likes: z.number().int().min(0, 'Likes cannot be negative').optional(),
  feedback: z
    .array(
      z.object({
        userId: z.string().min(1, 'Feedback User ID is required'),
        comment: z.string().optional(),
      }),
    )
    .optional(),
});

// Seasonal Recommendations schema
const seasonalRecommendationSchema = z.object({
  userLocation: z.string().min(1, 'User location is required'),
  currentSeason: z.enum(['spring', 'summer', 'fall', 'winter'], {
    message: 'Season must be one of: spring, summer, fall, winter',
  }),
  recommendedPlants: z
    .array(
      z.object({
        plantType: z.string().min(1, 'Plant type is required'),
        careTips: z.string().optional(),
      }),
    )
    .optional(),
});

// Zod validation schemas for creating and updating garden plans
const createGardenPlanSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  gardenPlots: z
    .array(gardenPlotSchema)
    .min(1, 'At least one garden plot is required'),
  plantGrowthTrackers: z.array(plantGrowthSchema).optional(),
});

const updateGardenPlanSchema = z.object({
  gardenPlots: z.array(gardenPlotSchema).optional(),
  plantGrowthTrackers: z.array(plantGrowthSchema).optional(),
});

// Export schemas
export const gardenPlannerSchemas = {
  createGardenPlanSchema,
  updateGardenPlanSchema,
  gardenPlotSchema,
  plantGrowthSchema,
  gardenShareSchema,
  seasonalRecommendationSchema,
};
