package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.BrandAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.BrandTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BrandMapperTest {

    private BrandMapper brandMapper;

    @BeforeEach
    void setUp() {
        brandMapper = new BrandMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getBrandSample1();
        var actual = brandMapper.toEntity(brandMapper.toDto(expected));
        assertBrandAllPropertiesEquals(expected, actual);
    }
}
