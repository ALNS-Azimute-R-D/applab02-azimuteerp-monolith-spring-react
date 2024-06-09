import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/country">
        <Translate contentKey="global.menu.entities.country" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/province">
        <Translate contentKey="global.menu.entities.province" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/town-city">
        <Translate contentKey="global.menu.entities.townCity" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/district">
        <Translate contentKey="global.menu.entities.district" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/common-locality">
        <Translate contentKey="global.menu.entities.commonLocality" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/tenant">
        <Translate contentKey="global.menu.entities.tenant" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/type-of-organization">
        <Translate contentKey="global.menu.entities.typeOfOrganization" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/organization">
        <Translate contentKey="global.menu.entities.organization" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/business-unit">
        <Translate contentKey="global.menu.entities.businessUnit" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/organization-domain">
        <Translate contentKey="global.menu.entities.organizationDomain" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/organization-attribute">
        <Translate contentKey="global.menu.entities.organizationAttribute" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/type-of-person">
        <Translate contentKey="global.menu.entities.typeOfPerson" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/person">
        <Translate contentKey="global.menu.entities.person" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/organization-role">
        <Translate contentKey="global.menu.entities.organizationRole" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/organization-membership">
        <Translate contentKey="global.menu.entities.organizationMembership" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/organization-member-role">
        <Translate contentKey="global.menu.entities.organizationMemberRole" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/asset-type">
        <Translate contentKey="global.menu.entities.assetType" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/raw-asset-proc-tmp">
        <Translate contentKey="global.menu.entities.rawAssetProcTmp" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/asset">
        <Translate contentKey="global.menu.entities.asset" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/asset-metadata">
        <Translate contentKey="global.menu.entities.assetMetadata" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/asset-collection">
        <Translate contentKey="global.menu.entities.assetCollection" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/invoice">
        <Translate contentKey="global.menu.entities.invoice" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/payment-gateway">
        <Translate contentKey="global.menu.entities.paymentGateway" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/payment">
        <Translate contentKey="global.menu.entities.payment" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/warehouse">
        <Translate contentKey="global.menu.entities.warehouse" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/supplier">
        <Translate contentKey="global.menu.entities.supplier" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/brand">
        <Translate contentKey="global.menu.entities.brand" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/product">
        <Translate contentKey="global.menu.entities.product" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/inventory-transaction">
        <Translate contentKey="global.menu.entities.inventoryTransaction" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/stock-level">
        <Translate contentKey="global.menu.entities.stockLevel" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/customer">
        <Translate contentKey="global.menu.entities.customer" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/customer-type">
        <Translate contentKey="global.menu.entities.customerType" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/category">
        <Translate contentKey="global.menu.entities.category" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/article">
        <Translate contentKey="global.menu.entities.article" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/order">
        <Translate contentKey="global.menu.entities.order" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/order-item">
        <Translate contentKey="global.menu.entities.orderItem" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
