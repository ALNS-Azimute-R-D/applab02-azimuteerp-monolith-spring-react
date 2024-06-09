package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Product;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.StockLevel;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Warehouse;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.ProductDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.StockLevelDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.WarehouseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link StockLevel} and its DTO {@link StockLevelDTO}.
 */
@Mapper(componentModel = "spring")
public interface StockLevelMapper extends EntityMapper<StockLevelDTO, StockLevel> {
    @Mapping(target = "warehouse", source = "warehouse", qualifiedByName = "warehouseAcronym")
    @Mapping(target = "product", source = "product", qualifiedByName = "productProductName")
    StockLevelDTO toDto(StockLevel s);

    @Named("warehouseAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    WarehouseDTO toDtoWarehouseAcronym(Warehouse warehouse);

    @Named("productProductName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "productName", source = "productName")
    ProductDTO toDtoProductProductName(Product product);
}
