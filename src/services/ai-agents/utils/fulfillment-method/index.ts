export enum FulfillmentMethodType {
  SELF = "self",
  CUSTOM_WAREHOUSE = "custom_warehouse",
  SHIPBOB = "shipbob",
  SHIPSTATION = "shipstation",
}

export interface FulfillmentMethodSettings {
  method: FulfillmentMethodType;
  warehouseEmail: string | null;
  shipbobPersonalAccessToken: string | null;
  shipstationApiKey: string | null;
}

export type GetFulfillmentMethodSettingsResponse = FulfillmentMethodSettings;

export type UpdateFulfillmentMethodSettingsParams =
  | {
      method: FulfillmentMethodType.SELF;
    }
  | {
      method: FulfillmentMethodType.CUSTOM_WAREHOUSE;
      warehouseEmail: string;
    }
  | {
      method: FulfillmentMethodType.SHIPBOB;
      shipbobPersonalAccessToken: string;
    }
  | {
      method: FulfillmentMethodType.SHIPSTATION;
      shipstationApiKey: string;
    };

export interface UpdateFulfillmentMethodSettingsResponse {
  message: string;
  statusCode: number;
}
