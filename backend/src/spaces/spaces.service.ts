import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space, SpaceDocument } from './schemas/space.schema';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';

@Injectable()
export class SpacesService {
  constructor(
    @InjectModel(Space.name) private spaceModel: Model<SpaceDocument>,
  ) {}

  async create(
    createSpaceDto: CreateSpaceDto,
    ownerId: string,
  ): Promise<Space> {
    const space = new this.spaceModel({
      ...createSpaceDto,
      owner: ownerId,
    });
    return space.save();
  }

  async findAll(): Promise<Space[]> {
    return this.spaceModel
      .find()
      .populate('owner', 'name email companyName')
      .exec();
  }

  async findOne(id: string): Promise<Space> {
    const space = await this.spaceModel
      .findById(id)
      .populate('owner', 'name email companyName')
      .exec();

    if (!space) {
      throw new NotFoundException('Space not found');
    }

    return space;
  }

  async findByOwner(ownerId: string): Promise<Space[]> {
    return this.spaceModel
      .find({ owner: ownerId })
      .populate('owner', 'name email companyName')
      .exec();
  }

  async update(
    id: string,
    updateSpaceDto: UpdateSpaceDto,
    ownerId: string,
  ): Promise<Space> {
    const space = await this.spaceModel.findOne({ _id: id, owner: ownerId });

    if (!space) {
      throw new NotFoundException('Space not found or you are not the owner');
    }

    Object.assign(space, updateSpaceDto);
    return space.save();
  }

  async remove(id: string, ownerId: string): Promise<void> {
    const result = await this.spaceModel.deleteOne({ _id: id, owner: ownerId });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Space not found or you are not the owner');
    }
  }
}
