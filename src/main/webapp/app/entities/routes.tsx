import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Country from './country';
import Province from './province';
import TownCity from './town-city';
import District from './district';
import CommonLocality from './common-locality';
import Tenant from './tenant';
import TypeOfOrganization from './type-of-organization';
import Organization from './organization';
import BusinessUnit from './business-unit';
import OrganizationDomain from './organization-domain';
import OrganizationAttribute from './organization-attribute';
import TypeOfPerson from './type-of-person';
import Person from './person';
import OrganizationRole from './organization-role';
import OrganizationMembership from './organization-membership';
import OrganizationMemberRole from './organization-member-role';
import AssetType from './asset-type';
import RawAssetProcTmp from './raw-asset-proc-tmp';
import Asset from './asset';
import AssetMetadata from './asset-metadata';
import AssetCollection from './asset-collection';
import Invoice from './invoice';
import PaymentGateway from './payment-gateway';
import Payment from './payment';
import Warehouse from './warehouse';
import Supplier from './supplier';
import Brand from './brand';
import Product from './product';
import InventoryTransaction from './inventory-transaction';
import StockLevel from './stock-level';
import Customer from './customer';
import CustomerType from './customer-type';
import Category from './category';
import Article from './article';
import Order from './order';
import OrderItem from './order-item';
import TypeOfArtmedia from './type-of-artmedia';
import TypeOfArtist from './type-of-artist';
import ArtisticGenre from './artistic-genre';
import Artist from './artist';
import Artwork from './artwork';
import ArtworkCast from './artwork-cast';
import TypeOfEvent from './type-of-event';
import TypeOfVenue from './type-of-venue';
import TypeOfActivity from './type-of-activity';
import Venue from './venue';
import Activity from './activity';
import Event from './event';
import Program from './program';
import EventProgram from './event-program';
import ScheduledActivity from './scheduled-activity';
import EventAttendee from './event-attendee';
import TicketPurchased from './ticket-purchased';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="country/*" element={<Country />} />
        <Route path="province/*" element={<Province />} />
        <Route path="town-city/*" element={<TownCity />} />
        <Route path="district/*" element={<District />} />
        <Route path="common-locality/*" element={<CommonLocality />} />
        <Route path="tenant/*" element={<Tenant />} />
        <Route path="type-of-organization/*" element={<TypeOfOrganization />} />
        <Route path="organization/*" element={<Organization />} />
        <Route path="business-unit/*" element={<BusinessUnit />} />
        <Route path="organization-domain/*" element={<OrganizationDomain />} />
        <Route path="organization-attribute/*" element={<OrganizationAttribute />} />
        <Route path="type-of-person/*" element={<TypeOfPerson />} />
        <Route path="person/*" element={<Person />} />
        <Route path="organization-role/*" element={<OrganizationRole />} />
        <Route path="organization-membership/*" element={<OrganizationMembership />} />
        <Route path="organization-member-role/*" element={<OrganizationMemberRole />} />
        <Route path="asset-type/*" element={<AssetType />} />
        <Route path="raw-asset-proc-tmp/*" element={<RawAssetProcTmp />} />
        <Route path="asset/*" element={<Asset />} />
        <Route path="asset-metadata/*" element={<AssetMetadata />} />
        <Route path="asset-collection/*" element={<AssetCollection />} />
        <Route path="invoice/*" element={<Invoice />} />
        <Route path="payment-gateway/*" element={<PaymentGateway />} />
        <Route path="payment/*" element={<Payment />} />
        <Route path="warehouse/*" element={<Warehouse />} />
        <Route path="supplier/*" element={<Supplier />} />
        <Route path="brand/*" element={<Brand />} />
        <Route path="product/*" element={<Product />} />
        <Route path="inventory-transaction/*" element={<InventoryTransaction />} />
        <Route path="stock-level/*" element={<StockLevel />} />
        <Route path="customer/*" element={<Customer />} />
        <Route path="customer-type/*" element={<CustomerType />} />
        <Route path="category/*" element={<Category />} />
        <Route path="article/*" element={<Article />} />
        <Route path="order/*" element={<Order />} />
        <Route path="order-item/*" element={<OrderItem />} />
        <Route path="type-of-artmedia/*" element={<TypeOfArtmedia />} />
        <Route path="type-of-artist/*" element={<TypeOfArtist />} />
        <Route path="artistic-genre/*" element={<ArtisticGenre />} />
        <Route path="artist/*" element={<Artist />} />
        <Route path="artwork/*" element={<Artwork />} />
        <Route path="artwork-cast/*" element={<ArtworkCast />} />
        <Route path="type-of-event/*" element={<TypeOfEvent />} />
        <Route path="type-of-venue/*" element={<TypeOfVenue />} />
        <Route path="type-of-activity/*" element={<TypeOfActivity />} />
        <Route path="venue/*" element={<Venue />} />
        <Route path="activity/*" element={<Activity />} />
        <Route path="event/*" element={<Event />} />
        <Route path="program/*" element={<Program />} />
        <Route path="event-program/*" element={<EventProgram />} />
        <Route path="scheduled-activity/*" element={<ScheduledActivity />} />
        <Route path="event-attendee/*" element={<EventAttendee />} />
        <Route path="ticket-purchased/*" element={<TicketPurchased />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
