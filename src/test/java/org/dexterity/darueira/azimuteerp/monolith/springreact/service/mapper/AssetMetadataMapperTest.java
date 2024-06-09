package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetMetadataAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetMetadataTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AssetMetadataMapperTest {

    private AssetMetadataMapper assetMetadataMapper;

    @BeforeEach
    void setUp() {
        assetMetadataMapper = new AssetMetadataMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAssetMetadataSample1();
        var actual = assetMetadataMapper.toEntity(assetMetadataMapper.toDto(expected));
        assertAssetMetadataAllPropertiesEquals(expected, actual);
    }
}
