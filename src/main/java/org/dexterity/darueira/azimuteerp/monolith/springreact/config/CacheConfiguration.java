package org.dexterity.darueira.azimuteerp.monolith.springreact.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(
                Object.class,
                Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries())
            )
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build()
        );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Country.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Country.class.getName() + ".provincesLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Province.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Province.class.getName() + ".townCitiesLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TownCity.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TownCity.class.getName() + ".districtsLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.District.class.getName());
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.District.class.getName() + ".commonLocalitiesLists"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.District.class.getName() + ".personsLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.District.class.getName() + ".customersLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.CommonLocality.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Tenant.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Tenant.class.getName() + ".organizationsLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfOrganization.class.getName());
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfOrganization.class.getName() + ".organizationsLists"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Organization.class.getName());
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Organization.class.getName() + ".organizationDomainsLists"
            );
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Organization.class.getName() + ".organizationAttributesLists"
            );
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Organization.class.getName() + ".businessUnitsLists"
            );
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Organization.class.getName() + ".childrenOrganizationsLists"
            );
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Organization.class.getName() + ".organizationRolesLists"
            );
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Organization.class.getName() + ".organizationMembershipsLists"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.BusinessUnit.class.getName());
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.BusinessUnit.class.getName() + ".childrenBusinessUnitsLists"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationDomain.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationAttribute.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfPerson.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfPerson.class.getName() + ".personsLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Person.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Person.class.getName() + ".managedPersonsLists");
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Person.class.getName() + ".organizationMembershipsLists"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Person.class.getName() + ".suppliersLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Person.class.getName() + ".customersLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationRole.class.getName());
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationRole.class.getName() +
                ".organizationMemberRolesLists"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationMembership.class.getName());
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationMembership.class.getName() +
                ".organizationMemberRolesLists"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrganizationMemberRole.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetType.class.getName());
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetType.class.getName() + ".rawAssetsProcsTmps"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetType.class.getName() + ".assets");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.RawAssetProcTmp.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.RawAssetProcTmp.class.getName() + ".assets");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Asset.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Asset.class.getName() + ".assetCollections");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetMetadata.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetCollection.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetCollection.class.getName() + ".assets");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssetCollection.class.getName() + ".articles");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Invoice.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Invoice.class.getName() + ".ordersLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.PaymentGateway.class.getName());
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.PaymentGateway.class.getName() + ".invoicesAsPreferrableLists"
            );
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.PaymentGateway.class.getName() + ".paymentsLists"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Payment.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Warehouse.class.getName());
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Warehouse.class.getName() + ".inventoryTransactionsLists"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Warehouse.class.getName() + ".stockLevelsLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Supplier.class.getName());
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Supplier.class.getName() + ".inventoryTransactionsLists"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Supplier.class.getName() + ".toProducts");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Brand.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Brand.class.getName() + ".productsLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Product.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Product.class.getName() + ".toSuppliers");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Product.class.getName() + ".productsLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Product.class.getName() + ".stockLevelsLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.InventoryTransaction.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.StockLevel.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Customer.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Customer.class.getName() + ".ordersLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.CustomerType.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.CustomerType.class.getName() + ".customersLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Category.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Category.class.getName() + ".articlesLists");
            createCache(
                cm,
                org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Category.class.getName() + ".childrenCategoriesLists"
            );
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Article.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Article.class.getName() + ".assetCollections");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Article.class.getName() + ".ordersItemsLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Order.class.getName());
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Order.class.getName() + ".orderItemsLists");
            createCache(cm, org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrderItem.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
