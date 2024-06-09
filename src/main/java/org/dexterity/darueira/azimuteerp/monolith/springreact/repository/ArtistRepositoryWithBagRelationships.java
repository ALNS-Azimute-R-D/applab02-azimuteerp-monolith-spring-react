package org.dexterity.darueira.azimuteerp.monolith.springreact.repository;

import java.util.List;
import java.util.Optional;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Artist;
import org.springframework.data.domain.Page;

public interface ArtistRepositoryWithBagRelationships {
    Optional<Artist> fetchBagRelationships(Optional<Artist> artist);

    List<Artist> fetchBagRelationships(List<Artist> artists);

    Page<Artist> fetchBagRelationships(Page<Artist> artists);
}
