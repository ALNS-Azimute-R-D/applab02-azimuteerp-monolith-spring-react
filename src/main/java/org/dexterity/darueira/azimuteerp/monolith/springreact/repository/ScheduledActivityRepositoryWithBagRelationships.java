package org.dexterity.darueira.azimuteerp.monolith.springreact.repository;

import java.util.List;
import java.util.Optional;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ScheduledActivity;
import org.springframework.data.domain.Page;

public interface ScheduledActivityRepositoryWithBagRelationships {
    Optional<ScheduledActivity> fetchBagRelationships(Optional<ScheduledActivity> scheduledActivity);

    List<ScheduledActivity> fetchBagRelationships(List<ScheduledActivity> scheduledActivities);

    Page<ScheduledActivity> fetchBagRelationships(Page<ScheduledActivity> scheduledActivities);
}
