package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ScheduledActivityAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ScheduledActivityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ScheduledActivityMapperTest {

    private ScheduledActivityMapper scheduledActivityMapper;

    @BeforeEach
    void setUp() {
        scheduledActivityMapper = new ScheduledActivityMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getScheduledActivitySample1();
        var actual = scheduledActivityMapper.toEntity(scheduledActivityMapper.toDto(expected));
        assertScheduledActivityAllPropertiesEquals(expected, actual);
    }
}
