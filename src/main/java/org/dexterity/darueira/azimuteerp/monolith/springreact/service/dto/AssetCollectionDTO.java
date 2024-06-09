package org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.enumeration.ActivationStatusEnum;

/**
 * A DTO for the {@link org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetCollection} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AssetCollectionDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 512)
    private String name;

    @Size(max = 512)
    private String fullFilenamePath;

    @NotNull
    private ActivationStatusEnum activationStatus;

    private Set<AssetDTO> assets = new HashSet<>();

    private Set<ArticleDTO> articles = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFullFilenamePath() {
        return fullFilenamePath;
    }

    public void setFullFilenamePath(String fullFilenamePath) {
        this.fullFilenamePath = fullFilenamePath;
    }

    public ActivationStatusEnum getActivationStatus() {
        return activationStatus;
    }

    public void setActivationStatus(ActivationStatusEnum activationStatus) {
        this.activationStatus = activationStatus;
    }

    public Set<AssetDTO> getAssets() {
        return assets;
    }

    public void setAssets(Set<AssetDTO> assets) {
        this.assets = assets;
    }

    public Set<ArticleDTO> getArticles() {
        return articles;
    }

    public void setArticles(Set<ArticleDTO> articles) {
        this.articles = articles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AssetCollectionDTO)) {
            return false;
        }

        AssetCollectionDTO assetCollectionDTO = (AssetCollectionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, assetCollectionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AssetCollectionDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", fullFilenamePath='" + getFullFilenamePath() + "'" +
            ", activationStatus='" + getActivationStatus() + "'" +
            ", assets=" + getAssets() +
            ", articles=" + getArticles() +
            "}";
    }
}
