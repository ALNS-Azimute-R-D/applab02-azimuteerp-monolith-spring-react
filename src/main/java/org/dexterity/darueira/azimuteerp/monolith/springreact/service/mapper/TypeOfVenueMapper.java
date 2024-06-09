package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfVenue;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TypeOfVenueDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TypeOfVenue} and its DTO {@link TypeOfVenueDTO}.
 */
@Mapper(componentModel = "spring")
public interface TypeOfVenueMapper extends EntityMapper<TypeOfVenueDTO, TypeOfVenue> {}
