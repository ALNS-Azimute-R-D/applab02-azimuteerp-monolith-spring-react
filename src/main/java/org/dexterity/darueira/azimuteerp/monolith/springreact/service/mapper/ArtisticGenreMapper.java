package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Artist;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ArtisticGenre;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.ArtistDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.ArtisticGenreDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ArtisticGenre} and its DTO {@link ArtisticGenreDTO}.
 */
@Mapper(componentModel = "spring")
public interface ArtisticGenreMapper extends EntityMapper<ArtisticGenreDTO, ArtisticGenre> {
    @Mapping(target = "artisticGenres", source = "artisticGenres", qualifiedByName = "artistIdSet")
    ArtisticGenreDTO toDto(ArtisticGenre s);

    @Mapping(target = "artisticGenres", ignore = true)
    @Mapping(target = "removeArtisticGenre", ignore = true)
    ArtisticGenre toEntity(ArtisticGenreDTO artisticGenreDTO);

    @Named("artistId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ArtistDTO toDtoArtistId(Artist artist);

    @Named("artistIdSet")
    default Set<ArtistDTO> toDtoArtistIdSet(Set<Artist> artist) {
        return artist.stream().map(this::toDtoArtistId).collect(Collectors.toSet());
    }
}
