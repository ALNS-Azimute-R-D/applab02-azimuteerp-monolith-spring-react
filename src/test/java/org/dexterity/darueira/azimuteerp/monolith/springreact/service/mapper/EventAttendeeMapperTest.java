package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.EventAttendeeAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.EventAttendeeTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EventAttendeeMapperTest {

    private EventAttendeeMapper eventAttendeeMapper;

    @BeforeEach
    void setUp() {
        eventAttendeeMapper = new EventAttendeeMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getEventAttendeeSample1();
        var actual = eventAttendeeMapper.toEntity(eventAttendeeMapper.toDto(expected));
        assertEventAttendeeAllPropertiesEquals(expected, actual);
    }
}
