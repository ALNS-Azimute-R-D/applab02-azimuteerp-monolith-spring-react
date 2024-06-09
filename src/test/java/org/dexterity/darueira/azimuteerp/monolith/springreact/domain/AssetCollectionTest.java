package org.dexterity.darueira.azimuteerp.monolith.springreact.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ArticleTestSamples.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetCollectionTestSamples.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetTestSamples.*;

import java.util.HashSet;
import java.util.Set;
import org.dexterity.darueira.azimuteerp.monolith.springreact.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AssetCollectionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssetCollection.class);
        AssetCollection assetCollection1 = getAssetCollectionSample1();
        AssetCollection assetCollection2 = new AssetCollection();
        assertThat(assetCollection1).isNotEqualTo(assetCollection2);

        assetCollection2.setId(assetCollection1.getId());
        assertThat(assetCollection1).isEqualTo(assetCollection2);

        assetCollection2 = getAssetCollectionSample2();
        assertThat(assetCollection1).isNotEqualTo(assetCollection2);
    }

    @Test
    void assetTest() {
        AssetCollection assetCollection = getAssetCollectionRandomSampleGenerator();
        Asset assetBack = getAssetRandomSampleGenerator();

        assetCollection.addAsset(assetBack);
        assertThat(assetCollection.getAssets()).containsOnly(assetBack);

        assetCollection.removeAsset(assetBack);
        assertThat(assetCollection.getAssets()).doesNotContain(assetBack);

        assetCollection.assets(new HashSet<>(Set.of(assetBack)));
        assertThat(assetCollection.getAssets()).containsOnly(assetBack);

        assetCollection.setAssets(new HashSet<>());
        assertThat(assetCollection.getAssets()).doesNotContain(assetBack);
    }

    @Test
    void articleTest() {
        AssetCollection assetCollection = getAssetCollectionRandomSampleGenerator();
        Article articleBack = getArticleRandomSampleGenerator();

        assetCollection.addArticle(articleBack);
        assertThat(assetCollection.getArticles()).containsOnly(articleBack);
        assertThat(articleBack.getAssetCollections()).containsOnly(assetCollection);

        assetCollection.removeArticle(articleBack);
        assertThat(assetCollection.getArticles()).doesNotContain(articleBack);
        assertThat(articleBack.getAssetCollections()).doesNotContain(assetCollection);

        assetCollection.articles(new HashSet<>(Set.of(articleBack)));
        assertThat(assetCollection.getArticles()).containsOnly(articleBack);
        assertThat(articleBack.getAssetCollections()).containsOnly(assetCollection);

        assetCollection.setArticles(new HashSet<>());
        assertThat(assetCollection.getArticles()).doesNotContain(articleBack);
        assertThat(articleBack.getAssetCollections()).doesNotContain(assetCollection);
    }
}
