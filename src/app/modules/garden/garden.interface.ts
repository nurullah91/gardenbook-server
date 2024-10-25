import { Types } from 'mongoose';

export type TGardenPlot = {
  _id?: string;
  userId: Types.ObjectId;
  name: string;
  layout: {
    rows: number;
    columns: number;
    plants: TPlant[]; // Positions of plants in the grid layout
  };
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TPlant = {
  name: string;
  type: 'vegetable' | 'flower' | 'herb'; // Plant category
  position: { x: number; y: number }; // Plant position in the grid
  growthStage: 'seed' | 'sprout' | 'mature'; // Plant growth stage
  wateringSchedule: string; // e.g., 'every 2 days'
  reminders: TReminder[];
  harvestDate?: Date;
};

export type TReminder = {
  task: string; // e.g., 'Fertilize', 'Prune'
  dueDate: Date;
};

export type TCommunityInteraction = {
  userId: string;
  comment: string;
  likes: number;
  createdAt: Date;
};
