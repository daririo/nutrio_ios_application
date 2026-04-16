import { Request, Response } from 'express';

export async function getSettings(req: Request, res: Response) {
    res.send('get settings')
}
export async function postSettings(req: Request, res: Response) {
    res.send('post new settings')
}
export async function patchSettings(req: Request, res: Response) {
    res.send('patch some settings')
}
