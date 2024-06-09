package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Asset;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetCollection;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetType;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.RawAssetProcTmp;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.AssetCollectionDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.AssetDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.AssetTypeDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.RawAssetProcTmpDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Asset} and its DTO {@link AssetDTO}.
 */
@Mapper(componentModel = "spring")
public interface AssetMapper extends EntityMapper<AssetDTO, Asset> {
    @Mapping(target = "assetType", source = "assetType", qualifiedByName = "assetTypeName")
    @Mapping(target = "rawAssetProcTmp", source = "rawAssetProcTmp", qualifiedByName = "rawAssetProcTmpName")
    @Mapping(target = "assetCollections", source = "assetCollections", qualifiedByName = "assetCollectionIdSet")
    AssetDTO toDto(Asset s);

    @Mapping(target = "assetCollections", ignore = true)
    @Mapping(target = "removeAssetCollection", ignore = true)
    Asset toEntity(AssetDTO assetDTO);

    @Named("assetTypeName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    AssetTypeDTO toDtoAssetTypeName(AssetType assetType);

    @Named("rawAssetProcTmpName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    RawAssetProcTmpDTO toDtoRawAssetProcTmpName(RawAssetProcTmp rawAssetProcTmp);

    @Named("assetCollectionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AssetCollectionDTO toDtoAssetCollectionId(AssetCollection assetCollection);

    @Named("assetCollectionIdSet")
    default Set<AssetCollectionDTO> toDtoAssetCollectionIdSet(Set<AssetCollection> assetCollection) {
        return assetCollection.stream().map(this::toDtoAssetCollectionId).collect(Collectors.toSet());
    }
}
