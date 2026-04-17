import { Request, Response } from 'express';
import * as settingService from '../services/service.settings';

export async function getSettings(req: Request, res: Response) {
  try {
    const setting = await settingService.getSettings();

    if (!setting) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    return res.status(200).json(setting);
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
}
export async function postSettings(req: Request, res: Response) {
  try {
    const setting = await settingService.createSetting(req.body);

    return res.status(201).json({
      message: 'Settings created',
      data: setting,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
}
export async function patchSettings(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Missing settings id',
      });
    }

    const updated = await settingService.patchSettings(Number(id), req.body);

    return res.status(200).json({
      message: 'Settings updated',
      data: updated,
    });
  } catch (error: any) {
    console.error(error);

    if (error.message === 'Setting not found') {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
}
