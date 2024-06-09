package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.InventoryTransaction;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Product;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Supplier;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Warehouse;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.InventoryTransactionDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.ProductDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.SupplierDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.WarehouseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link InventoryTransaction} and its DTO {@link InventoryTransactionDTO}.
 */
@Mapper(componentModel = "spring")
public interface InventoryTransactionMapper extends EntityMapper<InventoryTransactionDTO, InventoryTransaction> {
    @Mapping(target = "supplier", source = "supplier", qualifiedByName = "supplierAcronym")
    @Mapping(target = "product", source = "product", qualifiedByName = "productProductName")
    @Mapping(target = "warehouse", source = "warehouse", qualifiedByName = "warehouseAcronym")
    InventoryTransactionDTO toDto(InventoryTransaction s);

    @Named("supplierAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    SupplierDTO toDtoSupplierAcronym(Supplier supplier);

    @Named("productProductName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "productName", source = "productName")
    ProductDTO toDtoProductProductName(Product product);

    @Named("warehouseAcronym")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "acronym", source = "acronym")
    WarehouseDTO toDtoWarehouseAcronym(Warehouse warehouse);
}
