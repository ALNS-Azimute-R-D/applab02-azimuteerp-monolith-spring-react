package org.dexterity.darueira.azimuteerp.monolith.springreact.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationDomainTestSamples.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationTestSamples.*;

import org.dexterity.darueira.azimuteerp.monolith.springreact.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OrganizationDomainTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrganizationDomain.class);
        OrganizationDomain organizationDomain1 = getOrganizationDomainSample1();
        OrganizationDomain organizationDomain2 = new OrganizationDomain();
        assertThat(organizationDomain1).isNotEqualTo(organizationDomain2);

        organizationDomain2.setId(organizationDomain1.getId());
        assertThat(organizationDomain1).isEqualTo(organizationDomain2);

        organizationDomain2 = getOrganizationDomainSample2();
        assertThat(organizationDomain1).isNotEqualTo(organizationDomain2);
    }

    @Test
    void organizationTest() {
        OrganizationDomain organizationDomain = getOrganizationDomainRandomSampleGenerator();
        Organization organizationBack = getOrganizationRandomSampleGenerator();

        organizationDomain.setOrganization(organizationBack);
        assertThat(organizationDomain.getOrganization()).isEqualTo(organizationBack);

        organizationDomain.organization(null);
        assertThat(organizationDomain.getOrganization()).isNull();
    }
}
