package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Customer;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Invoice;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Order;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.CustomerDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.InvoiceDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.OrderDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {
    @Mapping(target = "invoice", source = "invoice", qualifiedByName = "invoiceDescription")
    @Mapping(target = "customer", source = "customer", qualifiedByName = "customerFullname")
    OrderDTO toDto(Order s);

    @Named("invoiceDescription")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "description", source = "description")
    InvoiceDTO toDtoInvoiceDescription(Invoice invoice);

    @Named("customerFullname")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "fullname", source = "fullname")
    CustomerDTO toDtoCustomerFullname(Customer customer);
}
