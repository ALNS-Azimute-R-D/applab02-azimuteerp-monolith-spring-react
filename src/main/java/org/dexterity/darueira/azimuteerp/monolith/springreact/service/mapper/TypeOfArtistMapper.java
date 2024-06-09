package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfArtist;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TypeOfArtistDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TypeOfArtist} and its DTO {@link TypeOfArtistDTO}.
 */
@Mapper(componentModel = "spring")
public interface TypeOfArtistMapper extends EntityMapper<TypeOfArtistDTO, TypeOfArtist> {}
