import { ResourceEntity } from '../types/resource.entity.type';
import { CreateDto } from '../types/resource.dto.create.type';
import { UpdateDto } from '../types/resource.dto.update.type';

export interface IResourceTypeInfo {
  entity: ResourceEntity;
  createDto: CreateDto;
  updateDto: UpdateDto;
  pluralForm: string;
}
