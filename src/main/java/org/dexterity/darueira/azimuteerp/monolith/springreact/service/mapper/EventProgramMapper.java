package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Event;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.EventProgram;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Person;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Program;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.EventDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.EventProgramDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.PersonDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.ProgramDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EventProgram} and its DTO {@link EventProgramDTO}.
 */
@Mapper(componentModel = "spring")
public interface EventProgramMapper extends EntityMapper<EventProgramDTO, EventProgram> {
    @Mapping(target = "event", source = "event", qualifiedByName = "eventAcronym")
    @Mapping(target = "program", source = "program", qualifiedByName = "programAcronym")
    @Mapping(target = "responsiblePerson", source = "responsiblePerson", qualifiedByName = "personFullname")
    EventProgramDTO toDto(EventProgram s);

    @Named("eventAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    EventDTO toDtoEventAcronym(Event event);

    @Named("programAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    ProgramDTO toDtoProgramAcronym(Program program);

    @Named("personFullname")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "fullname", source = "fullname")
    PersonDTO toDtoPersonFullname(Person person);
}
