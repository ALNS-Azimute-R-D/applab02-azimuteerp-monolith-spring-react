package org.dexterity.darueira.azimuteerp.monolith.springreact.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.CommonLocalityTestSamples.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.DistrictTestSamples.*;

import org.dexterity.darueira.azimuteerp.monolith.springreact.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CommonLocalityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommonLocality.class);
        CommonLocality commonLocality1 = getCommonLocalitySample1();
        CommonLocality commonLocality2 = new CommonLocality();
        assertThat(commonLocality1).isNotEqualTo(commonLocality2);

        commonLocality2.setId(commonLocality1.getId());
        assertThat(commonLocality1).isEqualTo(commonLocality2);

        commonLocality2 = getCommonLocalitySample2();
        assertThat(commonLocality1).isNotEqualTo(commonLocality2);
    }

    @Test
    void districtTest() {
        CommonLocality commonLocality = getCommonLocalityRandomSampleGenerator();
        District districtBack = getDistrictRandomSampleGenerator();

        commonLocality.setDistrict(districtBack);
        assertThat(commonLocality.getDistrict()).isEqualTo(districtBack);

        commonLocality.district(null);
        assertThat(commonLocality.getDistrict()).isNull();
    }
}
