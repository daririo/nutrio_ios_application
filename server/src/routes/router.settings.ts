import Router from 'express';
import { getSettings, postSettings, patchSettings } from '../conroller/controller.settings';
const settingsRouter = Router();

settingsRouter.route('/settings').get(getSettings).post(postSettings).patch(patchSettings)

export default settingsRouter;