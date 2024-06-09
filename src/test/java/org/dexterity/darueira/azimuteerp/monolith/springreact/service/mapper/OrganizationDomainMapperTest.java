package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationDomainAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationDomainTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class OrganizationDomainMapperTest {

    private OrganizationDomainMapper organizationDomainMapper;

    @BeforeEach
    void setUp() {
        organizationDomainMapper = new OrganizationDomainMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getOrganizationDomainSample1();
        var actual = organizationDomainMapper.toEntity(organizationDomainMapper.toDto(expected));
        assertOrganizationDomainAllPropertiesEquals(expected, actual);
    }
}
