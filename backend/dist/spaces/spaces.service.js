"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpacesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const space_schema_1 = require("./schemas/space.schema");
let SpacesService = class SpacesService {
    constructor(spaceModel) {
        this.spaceModel = spaceModel;
    }
    async create(createSpaceDto, ownerId) {
        const space = new this.spaceModel(Object.assign(Object.assign({}, createSpaceDto), { owner: ownerId }));
        return space.save();
    }
    async findAll() {
        return this.spaceModel
            .find()
            .populate('owner', 'name email companyName')
            .exec();
    }
    async findOne(id) {
        const space = await this.spaceModel
            .findById(id)
            .populate('owner', 'name email companyName')
            .exec();
        if (!space) {
            throw new common_1.NotFoundException('Space not found');
        }
        return space;
    }
    async findByOwner(ownerId) {
        return this.spaceModel
            .find({ owner: ownerId })
            .populate('owner', 'name email companyName')
            .exec();
    }
    async update(id, updateSpaceDto, ownerId) {
        const space = await this.spaceModel.findOne({ _id: id, owner: ownerId });
        if (!space) {
            throw new common_1.NotFoundException('Space not found or you are not the owner');
        }
        Object.assign(space, updateSpaceDto);
        return space.save();
    }
    async remove(id, ownerId) {
        const result = await this.spaceModel.deleteOne({ _id: id, owner: ownerId });
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Space not found or you are not the owner');
        }
    }
};
exports.SpacesService = SpacesService;
exports.SpacesService = SpacesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(space_schema_1.Space.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SpacesService);
//# sourceMappingURL=spaces.service.js.map