package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Organization;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationRole;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.OrganizationDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.OrganizationRoleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrganizationRole} and its DTO {@link OrganizationRoleDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrganizationRoleMapper extends EntityMapper<OrganizationRoleDTO, OrganizationRole> {
    @Mapping(target = "organization", source = "organization", qualifiedByName = "organizationName")
    OrganizationRoleDTO toDto(OrganizationRole s);

    @Named("organizationName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    OrganizationDTO toDtoOrganizationName(Organization organization);
}
