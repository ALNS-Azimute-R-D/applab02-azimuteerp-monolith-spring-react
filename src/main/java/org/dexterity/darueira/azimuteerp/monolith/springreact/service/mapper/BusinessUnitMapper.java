package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.BusinessUnit;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Organization;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.BusinessUnitDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.OrganizationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link BusinessUnit} and its DTO {@link BusinessUnitDTO}.
 */
@Mapper(componentModel = "spring")
public interface BusinessUnitMapper extends EntityMapper<BusinessUnitDTO, BusinessUnit> {
    @Mapping(target = "organization", source = "organization", qualifiedByName = "organizationName")
    @Mapping(target = "businessUnitParent", source = "businessUnitParent", qualifiedByName = "businessUnitName")
    BusinessUnitDTO toDto(BusinessUnit s);

    @Named("organizationName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    OrganizationDTO toDtoOrganizationName(Organization organization);

    @Named("businessUnitName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    BusinessUnitDTO toDtoBusinessUnitName(BusinessUnit businessUnit);
}
