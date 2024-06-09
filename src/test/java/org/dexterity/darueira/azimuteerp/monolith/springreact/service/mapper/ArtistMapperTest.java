package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ArtistAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ArtistTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ArtistMapperTest {

    private ArtistMapper artistMapper;

    @BeforeEach
    void setUp() {
        artistMapper = new ArtistMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getArtistSample1();
        var actual = artistMapper.toEntity(artistMapper.toDto(expected));
        assertArtistAllPropertiesEquals(expected, actual);
    }
}
