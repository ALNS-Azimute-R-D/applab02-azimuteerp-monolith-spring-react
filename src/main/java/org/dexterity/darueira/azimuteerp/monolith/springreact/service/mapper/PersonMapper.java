package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.District;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Person;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfPerson;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.DistrictDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.PersonDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TypeOfPersonDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Person} and its DTO {@link PersonDTO}.
 */
@Mapper(componentModel = "spring")
public interface PersonMapper extends EntityMapper<PersonDTO, Person> {
    @Mapping(target = "typeOfPerson", source = "typeOfPerson", qualifiedByName = "typeOfPersonCode")
    @Mapping(target = "district", source = "district", qualifiedByName = "districtName")
    @Mapping(target = "managerPerson", source = "managerPerson", qualifiedByName = "personLastname")
    PersonDTO toDto(Person s);

    @Named("typeOfPersonCode")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "code", source = "code")
    TypeOfPersonDTO toDtoTypeOfPersonCode(TypeOfPerson typeOfPerson);

    @Named("districtName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    DistrictDTO toDtoDistrictName(District district);

    @Named("personLastname")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "lastname", source = "lastname")
    PersonDTO toDtoPersonLastname(Person person);
}
