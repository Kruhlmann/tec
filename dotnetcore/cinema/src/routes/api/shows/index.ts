import { Request, Response } from "express";

import { HttpStatusCode } from "../../../lib/http_status_codes";
import { Movie, Seat, Show, User } from "../../../lib/models";

export async function get(_request: Request, response: Response): Promise<void> {
    const all_shows = await Show.findAll({ include: [Movie, User, Seat] });
    const json_shows = JSON.stringify(all_shows);
    response.status(HttpStatusCode.OK).end(json_shows);
}

export async function post(request: Request, response: Response): Promise<void> {
    Show.create(request.body)
        .catch((error) => {
            console.error(error);
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        })
        .then(async (show) => {
            response.status(HttpStatusCode.CREATED).end(JSON.stringify(show));
        });
}
