package org.dexterity.darueira.azimuteerp.monolith.springreact.repository;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfOrganization;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TypeOfOrganization entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeOfOrganizationRepository extends JpaRepository<TypeOfOrganization, Long> {}
