package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetCollectionAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetCollectionTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AssetCollectionMapperTest {

    private AssetCollectionMapper assetCollectionMapper;

    @BeforeEach
    void setUp() {
        assetCollectionMapper = new AssetCollectionMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAssetCollectionSample1();
        var actual = assetCollectionMapper.toEntity(assetCollectionMapper.toDto(expected));
        assertAssetCollectionAllPropertiesEquals(expected, actual);
    }
}
