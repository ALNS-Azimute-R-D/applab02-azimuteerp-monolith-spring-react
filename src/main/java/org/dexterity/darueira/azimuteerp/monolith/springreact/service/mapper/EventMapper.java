package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetCollection;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Event;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Person;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfEvent;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Venue;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.AssetCollectionDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.EventDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.PersonDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TypeOfEventDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.VenueDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Event} and its DTO {@link EventDTO}.
 */
@Mapper(componentModel = "spring")
public interface EventMapper extends EntityMapper<EventDTO, Event> {
    @Mapping(target = "mainVenue", source = "mainVenue", qualifiedByName = "venueAcronym")
    @Mapping(target = "typeOfEvent", source = "typeOfEvent", qualifiedByName = "typeOfEventAcronym")
    @Mapping(target = "promoteurPerson", source = "promoteurPerson", qualifiedByName = "personFullname")
    @Mapping(target = "assetCollections", source = "assetCollections", qualifiedByName = "assetCollectionIdSet")
    EventDTO toDto(Event s);

    @Mapping(target = "removeAssetCollection", ignore = true)
    Event toEntity(EventDTO eventDTO);

    @Named("venueAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    VenueDTO toDtoVenueAcronym(Venue venue);

    @Named("typeOfEventAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    TypeOfEventDTO toDtoTypeOfEventAcronym(TypeOfEvent typeOfEvent);

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
