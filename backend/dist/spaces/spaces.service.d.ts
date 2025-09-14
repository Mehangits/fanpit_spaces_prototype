import { Model } from 'mongoose';
import { Space, SpaceDocument } from './schemas/space.schema';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
export declare class SpacesService {
    private spaceModel;
    constructor(spaceModel: Model<SpaceDocument>);
    create(createSpaceDto: CreateSpaceDto, ownerId: string): Promise<Space>;
    findAll(): Promise<Space[]>;
    findOne(id: string): Promise<Space>;
    findByOwner(ownerId: string): Promise<Space[]>;
    update(id: string, updateSpaceDto: UpdateSpaceDto, ownerId: string): Promise<Space>;
    remove(id: string, ownerId: string): Promise<void>;
}
