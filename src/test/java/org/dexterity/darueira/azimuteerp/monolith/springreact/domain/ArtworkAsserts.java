package org.dexterity.darueira.azimuteerp.monolith.springreact.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class ArtworkAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertArtworkAllPropertiesEquals(Artwork expected, Artwork actual) {
        assertArtworkAutoGeneratedPropertiesEquals(expected, actual);
        assertArtworkAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertArtworkAllUpdatablePropertiesEquals(Artwork expected, Artwork actual) {
        assertArtworkUpdatableFieldsEquals(expected, actual);
        assertArtworkUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertArtworkAutoGeneratedPropertiesEquals(Artwork expected, Artwork actual) {
        assertThat(expected)
            .as("Verify Artwork auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertArtworkUpdatableFieldsEquals(Artwork expected, Artwork actual) {
        assertThat(expected)
            .as("Verify Artwork relevant properties")
            .satisfies(e -> assertThat(e.getArtworkTitle()).as("check artworkTitle").isEqualTo(actual.getArtworkTitle()))
            .satisfies(e -> assertThat(e.getProductionYear()).as("check productionYear").isEqualTo(actual.getProductionYear()))
            .satisfies(e -> assertThat(e.getSeasonNumber()).as("check seasonNumber").isEqualTo(actual.getSeasonNumber()))
            .satisfies(
                e ->
                    assertThat(e.getEpisodeOrSequenceNumber())
                        .as("check episodeOrSequenceNumber")
                        .isEqualTo(actual.getEpisodeOrSequenceNumber())
            )
            .satisfies(e -> assertThat(e.getRegisterIdInIMDB()).as("check registerIdInIMDB").isEqualTo(actual.getRegisterIdInIMDB()))
            .satisfies(
                e -> assertThat(e.getAssetsCollectionUUID()).as("check assetsCollectionUUID").isEqualTo(actual.getAssetsCollectionUUID())
            )
            .satisfies(e -> assertThat(e.getContentDetailsJSON()).as("check contentDetailsJSON").isEqualTo(actual.getContentDetailsJSON()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertArtworkUpdatableRelationshipsEquals(Artwork expected, Artwork actual) {
        assertThat(expected)
            .as("Verify Artwork relationships")
            .satisfies(e -> assertThat(e.getTypeOfArtmedia()).as("check typeOfArtmedia").isEqualTo(actual.getTypeOfArtmedia()))
            .satisfies(e -> assertThat(e.getArtworkAggregator()).as("check artworkAggregator").isEqualTo(actual.getArtworkAggregator()));
    }
}