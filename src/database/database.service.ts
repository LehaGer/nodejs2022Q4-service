import { Inject, Injectable } from '@nestjs/common';
import { IDatabase } from './interfaces/database.interface';
import { ResourceTypeName } from './types/resourceTypeName';
import { IResourceTypeCoincidence } from './interfaces/resourceTypeCoincidence.interface';

@Injectable()
export class DatabaseService {
  constructor(@Inject('IDatabase') private storage: IDatabase) {}

  findAll<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
  ): Promise<K[T]['entity'][]> {
    return this.storage.findAll<T, K>(resourceType);
  }

  findById<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
  ): Promise<K[T]['entity'] | undefined> {
    return this.storage.findById<T, K>(resourceType, id);
  }

  create<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    params: K[T]['createDto'],
  ): Promise<K[T]['entity']> {
    return this.storage.create<ResourceTypeName, IResourceTypeCoincidence>(
      resourceType,
      params,
    );
  }

  update<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
    params: K[T]['updateDto'],
  ): Promise<K[T]['entity']> {
    return this.storage.update<T, K>(resourceType, id, params);
  }

  delete<T extends ResourceTypeName>(
    resourceType: T,
    id: string,
  ): Promise<void> {
    return this.storage.delete<T>(resourceType, id);
  }
}
