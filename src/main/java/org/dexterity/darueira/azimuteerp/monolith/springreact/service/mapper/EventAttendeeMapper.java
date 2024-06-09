package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Event;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.EventAttendee;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Person;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TicketPurchased;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.EventAttendeeDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.EventDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.PersonDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TicketPurchasedDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EventAttendee} and its DTO {@link EventAttendeeDTO}.
 */
@Mapper(componentModel = "spring")
public interface EventAttendeeMapper extends EntityMapper<EventAttendeeDTO, EventAttendee> {
    @Mapping(target = "attendeePerson", source = "attendeePerson", qualifiedByName = "personFullname")
    @Mapping(target = "event", source = "event", qualifiedByName = "eventAcronym")
    @Mapping(target = "ticketPurchased", source = "ticketPurchased", qualifiedByName = "ticketPurchasedBuyingCode")
    EventAttendeeDTO toDto(EventAttendee s);

    @Named("personFullname")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "fullname", source = "fullname")
    PersonDTO toDtoPersonFullname(Person person);

    @Named("eventAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    EventDTO toDtoEventAcronym(Event event);

    @Named("ticketPurchasedBuyingCode")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "buyingCode", source = "buyingCode")
    TicketPurchasedDTO toDtoTicketPurchasedBuyingCode(TicketPurchased ticketPurchased);
}
