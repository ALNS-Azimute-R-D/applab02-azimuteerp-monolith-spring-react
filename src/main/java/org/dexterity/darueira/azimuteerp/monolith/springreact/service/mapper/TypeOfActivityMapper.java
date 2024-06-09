package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfActivity;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TypeOfActivityDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TypeOfActivity} and its DTO {@link TypeOfActivityDTO}.
 */
@Mapper(componentModel = "spring")
public interface TypeOfActivityMapper extends EntityMapper<TypeOfActivityDTO, TypeOfActivity> {}
