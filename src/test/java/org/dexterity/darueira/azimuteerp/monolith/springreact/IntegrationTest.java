package org.dexterity.darueira.azimuteerp.monolith.springreact;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.dexterity.darueira.azimuteerp.monolith.springreact.config.AsyncSyncConfiguration;
import org.dexterity.darueira.azimuteerp.monolith.springreact.config.EmbeddedSQL;
import org.dexterity.darueira.azimuteerp.monolith.springreact.config.JacksonConfiguration;
import org.dexterity.darueira.azimuteerp.monolith.springreact.config.TestSecurityConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(
    classes = {
        AzimuteErpSpringReactMonolith03App.class, JacksonConfiguration.class, AsyncSyncConfiguration.class, TestSecurityConfiguration.class,
    }
)
@EmbeddedSQL
public @interface IntegrationTest {
}
