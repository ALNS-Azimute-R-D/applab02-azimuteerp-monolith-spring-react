package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfVenueAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfVenueTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TypeOfVenueMapperTest {

    private TypeOfVenueMapper typeOfVenueMapper;

    @BeforeEach
    void setUp() {
        typeOfVenueMapper = new TypeOfVenueMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTypeOfVenueSample1();
        var actual = typeOfVenueMapper.toEntity(typeOfVenueMapper.toDto(expected));
        assertTypeOfVenueAllPropertiesEquals(expected, actual);
    }
}
