import { Connection } from "mongoose";
import { TechnologySchema } from "./schemas/technologie.schema";



export const technologiesProviders = [
    {
        provide: 'TECH_MODEL',
        useFactory: (connection: Connection) => connection.model('Tech', TechnologySchema),
        inject: ['DATABASE_CONNECTION'],
    }
]