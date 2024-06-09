package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Event;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Invoice;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TicketPurchased;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.EventDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.InvoiceDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TicketPurchasedDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TicketPurchased} and its DTO {@link TicketPurchasedDTO}.
 */
@Mapper(componentModel = "spring")
public interface TicketPurchasedMapper extends EntityMapper<TicketPurchasedDTO, TicketPurchased> {
    @Mapping(target = "event", source = "event", qualifiedByName = "eventAcronym")
    @Mapping(target = "invoice", source = "invoice", qualifiedByName = "invoiceId")
    TicketPurchasedDTO toDto(TicketPurchased s);

    @Named("eventAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    EventDTO toDtoEventAcronym(Event event);

    @Named("invoiceId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    InvoiceDTO toDtoInvoiceId(Invoice invoice);
}
