package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Artwork;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfArtmedia;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.ArtworkDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TypeOfArtmediaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Artwork} and its DTO {@link ArtworkDTO}.
 */
@Mapper(componentModel = "spring")
public interface ArtworkMapper extends EntityMapper<ArtworkDTO, Artwork> {
    @Mapping(target = "typeOfArtmedia", source = "typeOfArtmedia", qualifiedByName = "typeOfArtmediaAcronym")
    @Mapping(target = "artworkAggregator", source = "artworkAggregator", qualifiedByName = "artworkArtworkTitle")
    ArtworkDTO toDto(Artwork s);

    @Named("typeOfArtmediaAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    TypeOfArtmediaDTO toDtoTypeOfArtmediaAcronym(TypeOfArtmedia typeOfArtmedia);

    @Named("artworkArtworkTitle")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "artworkTitle", source = "artworkTitle")
    ArtworkDTO toDtoArtworkArtworkTitle(Artwork artwork);
}
