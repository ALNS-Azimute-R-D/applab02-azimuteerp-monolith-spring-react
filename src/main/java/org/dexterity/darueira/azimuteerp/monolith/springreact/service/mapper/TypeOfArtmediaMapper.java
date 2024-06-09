package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfArtmedia;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TypeOfArtmediaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TypeOfArtmedia} and its DTO {@link TypeOfArtmediaDTO}.
 */
@Mapper(componentModel = "spring")
public interface TypeOfArtmediaMapper extends EntityMapper<TypeOfArtmediaDTO, TypeOfArtmedia> {}
