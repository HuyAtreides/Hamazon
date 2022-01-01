/** Mapper of DTO to domain model. */
export interface IMapperFromDto<TDto, TDomain> {
  /** Map DTO to domain model. */
  fromDto(data: TDto): TDomain;
}

/** Mapper of domain model to DTO. */
export interface IMapperToDto<TDto, TDomain> {
  /** Map domain model to DTO. */
  toDto(data: TDomain): TDto;
}
