package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.CustomerType;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.CustomerTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CustomerType} and its DTO {@link CustomerTypeDTO}.
 */
@Mapper(componentModel = "spring")
public interface CustomerTypeMapper extends EntityMapper<CustomerTypeDTO, CustomerType> {}
