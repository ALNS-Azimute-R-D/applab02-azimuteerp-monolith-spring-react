package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Asset;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetMetadata;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.AssetDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.AssetMetadataDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AssetMetadata} and its DTO {@link AssetMetadataDTO}.
 */
@Mapper(componentModel = "spring")
public interface AssetMetadataMapper extends EntityMapper<AssetMetadataDTO, AssetMetadata> {
    @Mapping(target = "asset", source = "asset", qualifiedByName = "assetName")
    AssetMetadataDTO toDto(AssetMetadata s);

    @Named("assetName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    AssetDTO toDtoAssetName(Asset asset);
}
