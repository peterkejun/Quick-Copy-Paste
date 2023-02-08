export interface CreateCollectionDto {
  name: string;
}

export type UpdateCollectionDto = Partial<CreateCollectionDto>;
