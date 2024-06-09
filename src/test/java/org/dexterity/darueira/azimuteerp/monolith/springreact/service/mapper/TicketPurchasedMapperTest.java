package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TicketPurchasedAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TicketPurchasedTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TicketPurchasedMapperTest {

    private TicketPurchasedMapper ticketPurchasedMapper;

    @BeforeEach
    void setUp() {
        ticketPurchasedMapper = new TicketPurchasedMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTicketPurchasedSample1();
        var actual = ticketPurchasedMapper.toEntity(ticketPurchasedMapper.toDto(expected));
        assertTicketPurchasedAllPropertiesEquals(expected, actual);
    }
}
