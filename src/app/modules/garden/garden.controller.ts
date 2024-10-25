import { GardenService } from './garden.service';
import handleAsync from '../../utils/handleAsync';
import responseSender from '../../utils/responseSender';
import httpStatus from 'http-status';

const createGardenPlot = handleAsync(async (req, res) => {
  const result = await GardenService.createGardenPlot(req.body);
  responseSender(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Garden plot created successfully',
    data: result,
  });
});

const getGardenPlotsByUser = handleAsync(async (req, res) => {
  const result = await GardenService.getGardenPlotsByUser(req.params.userId);
  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Garden plots retrieved successfully',
    data: result,
  });
});

const updateGardenPlot = handleAsync(async (req, res) => {
  const result = await GardenService.updateGardenPlot(
    req.params.plotId,
    req.body,
  );
  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Garden plot updated successfully',
    data: result,
  });
});

const deleteGardenPlot = handleAsync(async (req, res) => {
  const result = await GardenService.deleteGardenPlot(req.params.plotId);
  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Garden plot deleted successfully',
    data: result,
  });
});

export const GardenController = {
  createGardenPlot,
  getGardenPlotsByUser,
  updateGardenPlot,
  deleteGardenPlot,
};
