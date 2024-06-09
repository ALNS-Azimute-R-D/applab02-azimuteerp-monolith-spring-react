package org.dexterity.darueira.azimuteerp.monolith.springreact.repository;

import java.util.List;
import java.util.Optional;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Article;
import org.springframework.data.domain.Page;

public interface ArticleRepositoryWithBagRelationships {
    Optional<Article> fetchBagRelationships(Optional<Article> article);

    List<Article> fetchBagRelationships(List<Article> articles);

    Page<Article> fetchBagRelationships(Page<Article> articles);
}
