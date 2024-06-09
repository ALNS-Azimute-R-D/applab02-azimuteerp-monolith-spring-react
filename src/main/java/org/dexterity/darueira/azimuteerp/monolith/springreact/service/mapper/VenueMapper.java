package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.CommonLocality;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfVenue;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Venue;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.CommonLocalityDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TypeOfVenueDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.VenueDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Venue} and its DTO {@link VenueDTO}.
 */
@Mapper(componentModel = "spring")
public interface VenueMapper extends EntityMapper<VenueDTO, Venue> {
    @Mapping(target = "typeOfVenue", source = "typeOfVenue", qualifiedByName = "typeOfVenueAcronym")
    @Mapping(target = "commonLocality", source = "commonLocality", qualifiedByName = "commonLocalityName")
    VenueDTO toDto(Venue s);

    @Named("typeOfVenueAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    TypeOfVenueDTO toDtoTypeOfVenueAcronym(TypeOfVenue typeOfVenue);

    @Named("commonLocalityName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    CommonLocalityDTO toDtoCommonLocalityName(CommonLocality commonLocality);
}
