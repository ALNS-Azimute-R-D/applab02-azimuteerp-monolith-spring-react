package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.StockLevelAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.StockLevelTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StockLevelMapperTest {

    private StockLevelMapper stockLevelMapper;

    @BeforeEach
    void setUp() {
        stockLevelMapper = new StockLevelMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getStockLevelSample1();
        var actual = stockLevelMapper.toEntity(stockLevelMapper.toDto(expected));
        assertStockLevelAllPropertiesEquals(expected, actual);
    }
}
