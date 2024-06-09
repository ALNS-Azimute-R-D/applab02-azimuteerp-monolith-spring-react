package org.dexterity.darueira.azimuteerp.monolith.springreact.repository;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfVenue;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TypeOfVenue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeOfVenueRepository extends JpaRepository<TypeOfVenue, Long> {}
