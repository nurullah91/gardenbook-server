import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TGardenPlot } from './garden.interface';
import { GardenPlot } from './garden.model';

const createGardenPlot = async (payload: TGardenPlot) => {
  const newGardenPlot = await GardenPlot.create(payload);
  return newGardenPlot;
};

const getGardenPlotsByUser = async (userId: string) => {
  const gardenPlots = await GardenPlot.find({ userId });
  if (!gardenPlots) {
    throw new AppError(httpStatus.NOT_FOUND, 'Garden plots not found');
  }
  return gardenPlots;
};

const updateGardenPlot = async (
  plotId: string,
  updates: Partial<TGardenPlot>,
) => {
  const updatedPlot = await GardenPlot.findByIdAndUpdate(plotId, updates, {
    new: true,
  });
  if (!updatedPlot) {
    throw new AppError(httpStatus.NOT_FOUND, 'Garden plot not found');
  }
  return updatedPlot;
};

const deleteGardenPlot = async (plotId: string) => {
  const deletedPlot = await GardenPlot.findByIdAndUpdate(
    plotId,
    { isDeleted: true },
    { new: true },
  );
  if (!deletedPlot) {
    throw new AppError(httpStatus.NOT_FOUND, 'Garden plot not found');
  }
  return null;
};

export const GardenService = {
  createGardenPlot,
  getGardenPlotsByUser,
  updateGardenPlot,
  deleteGardenPlot,
};
