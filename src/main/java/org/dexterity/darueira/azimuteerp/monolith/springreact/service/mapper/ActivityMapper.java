package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Activity;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetCollection;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Person;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfActivity;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.ActivityDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.AssetCollectionDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.PersonDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TypeOfActivityDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Activity} and its DTO {@link ActivityDTO}.
 */
@Mapper(componentModel = "spring")
public interface ActivityMapper extends EntityMapper<ActivityDTO, Activity> {
    @Mapping(target = "typeOfActivity", source = "typeOfActivity", qualifiedByName = "typeOfActivityAcronym")
    @Mapping(target = "createdByUser", source = "createdByUser", qualifiedByName = "personFullname")
    @Mapping(target = "assetCollections", source = "assetCollections", qualifiedByName = "assetCollectionIdSet")
    ActivityDTO toDto(Activity s);

    @Mapping(target = "removeAssetCollection", ignore = true)
    Activity toEntity(ActivityDTO activityDTO);

    @Named("typeOfActivityAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    TypeOfActivityDTO toDtoTypeOfActivityAcronym(TypeOfActivity typeOfActivity);

    @Named("personFullname")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "fullname", source = "fullname")
    PersonDTO toDtoPersonFullname(Person person);

    @Named("assetCollectionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AssetCollectionDTO toDtoAssetCollectionId(AssetCollection assetCollection);

    @Named("assetCollectionIdSet")
    default Set<AssetCollectionDTO> toDtoAssetCollectionIdSet(Set<AssetCollection> assetCollection) {
        return assetCollection.stream().map(this::toDtoAssetCollectionId).collect(Collectors.toSet());
    }
}
