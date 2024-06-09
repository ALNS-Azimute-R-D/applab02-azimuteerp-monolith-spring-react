package org.dexterity.darueira.azimuteerp.monolith.springreact.repository;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Program;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Program entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {}
