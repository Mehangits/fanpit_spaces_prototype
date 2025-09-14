import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import * as authTypes from '../auth/types/auth.types';
export declare class SpacesController {
    private readonly spacesService;
    constructor(spacesService: SpacesService);
    create(createSpaceDto: CreateSpaceDto, req: authTypes.AuthenticatedRequest): Promise<import("./schemas/space.schema").Space>;
    findAll(): Promise<import("./schemas/space.schema").Space[]>;
    findOne(id: string): Promise<import("./schemas/space.schema").Space>;
    findByOwner(req: authTypes.AuthenticatedRequest): Promise<import("./schemas/space.schema").Space[]>;
    update(id: string, updateSpaceDto: UpdateSpaceDto, req: authTypes.AuthenticatedRequest): Promise<import("./schemas/space.schema").Space>;
    remove(id: string, req: authTypes.AuthenticatedRequest): Promise<void>;
}
