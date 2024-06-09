package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ArtworkCastAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ArtworkCastTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ArtworkCastMapperTest {

    private ArtworkCastMapper artworkCastMapper;

    @BeforeEach
    void setUp() {
        artworkCastMapper = new ArtworkCastMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getArtworkCastSample1();
        var actual = artworkCastMapper.toEntity(artworkCastMapper.toDto(expected));
        assertArtworkCastAllPropertiesEquals(expected, actual);
    }
}
