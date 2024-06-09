package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Organization;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationAttribute;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.OrganizationAttributeDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.OrganizationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrganizationAttribute} and its DTO {@link OrganizationAttributeDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrganizationAttributeMapper extends EntityMapper<OrganizationAttributeDTO, OrganizationAttribute> {
    @Mapping(target = "organization", source = "organization", qualifiedByName = "organizationName")
    OrganizationAttributeDTO toDto(OrganizationAttribute s);

    @Named("organizationName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    OrganizationDTO toDtoOrganizationName(Organization organization);
}
