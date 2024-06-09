package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetType;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.AssetTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AssetType} and its DTO {@link AssetTypeDTO}.
 */
@Mapper(componentModel = "spring")
public interface AssetTypeMapper extends EntityMapper<AssetTypeDTO, AssetType> {}
