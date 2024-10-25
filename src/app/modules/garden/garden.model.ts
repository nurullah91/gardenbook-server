import { Schema, model } from 'mongoose';
import { TGardenPlot, TPlant, TReminder } from './garden.interface';

const reminderSchema = new Schema<TReminder>({
  task: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

const plantSchema = new Schema<TPlant>({
  name: { type: String, required: true },
  type: { type: String, enum: ['vegetable', 'flower', 'herb'], required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  growthStage: {
    type: String,
    enum: ['seed', 'sprout', 'mature'],
    default: 'seed',
  },
  wateringSchedule: { type: String, required: true },
  reminders: [reminderSchema],
  harvestDate: { type: Date },
});

const gardenPlotSchema = new Schema<TGardenPlot>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    layout: {
      rows: { type: Number, required: true },
      columns: { type: Number, required: true },
      plants: [plantSchema],
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const GardenPlot = model<TGardenPlot>('GardenPlot', gardenPlotSchema);
