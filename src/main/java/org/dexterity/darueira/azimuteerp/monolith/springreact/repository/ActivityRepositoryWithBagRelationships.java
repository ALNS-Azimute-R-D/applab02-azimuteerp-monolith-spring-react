package org.dexterity.darueira.azimuteerp.monolith.springreact.repository;

import java.util.List;
import java.util.Optional;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Activity;
import org.springframework.data.domain.Page;

public interface ActivityRepositoryWithBagRelationships {
    Optional<Activity> fetchBagRelationships(Optional<Activity> activity);

    List<Activity> fetchBagRelationships(List<Activity> activities);

    Page<Activity> fetchBagRelationships(Page<Activity> activities);
}
