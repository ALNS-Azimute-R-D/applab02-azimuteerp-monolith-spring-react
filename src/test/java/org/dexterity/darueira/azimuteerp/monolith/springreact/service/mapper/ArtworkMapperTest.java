package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ArtworkAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ArtworkTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ArtworkMapperTest {

    private ArtworkMapper artworkMapper;

    @BeforeEach
    void setUp() {
        artworkMapper = new ArtworkMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getArtworkSample1();
        var actual = artworkMapper.toEntity(artworkMapper.toDto(expected));
        assertArtworkAllPropertiesEquals(expected, actual);
    }
}
