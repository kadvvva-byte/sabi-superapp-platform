import {
  STREAM_PRODUCT_CATALOG_CLASSIFICATION_VERSION,
  STREAM_PRODUCT_CATALOG_CLASSIFICATIONS,
  buildStreamProductCatalogClassificationSnapshot,
  type StreamProductCatalogClassificationSnapshot,
} from "./stream-product-catalog-classification.contracts";

export type StreamProductCatalogClassificationSourcePlan = Readonly<{
  version: typeof STREAM_PRODUCT_CATALOG_CLASSIFICATION_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141I";
  runtimeUseAllowedNow: false;
  productActivationAllowedNow: false;
  routeMountAllowedNow: false;
  liveBillingEnabledNow: false;
  googleProviderCallAllowedNow: false;
  externalProviderCallAllowedNow: false;
  payoutProviderCallAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  allProductsMustBeClassifiedBeforeLaunch: true;
  unclassifiedProductsBlocked: true;
  productCount: number;
  snapshot: StreamProductCatalogClassificationSnapshot;
  requiredBeforeRuntime: readonly string[];
}>;

export const STREAM_PRODUCT_CATALOG_CLASSIFICATION_SOURCE_PLAN: StreamProductCatalogClassificationSourcePlan = {
  version: STREAM_PRODUCT_CATALOG_CLASSIFICATION_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141I",
  runtimeUseAllowedNow: false,
  productActivationAllowedNow: false,
  routeMountAllowedNow: false,
  liveBillingEnabledNow: false,
  googleProviderCallAllowedNow: false,
  externalProviderCallAllowedNow: false,
  payoutProviderCallAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowed: false,
  allProductsMustBeClassifiedBeforeLaunch: true,
  unclassifiedProductsBlocked: true,
  productCount: STREAM_PRODUCT_CATALOG_CLASSIFICATIONS.length,
  snapshot: buildStreamProductCatalogClassificationSnapshot(),
  requiredBeforeRuntime: [
    "Admin product catalog read-only route contract",
    "Google Play Console SKU mapping for Android digital goods/services",
    "External payment provider SKU/order mapping for physical commerce",
    "Fee model review for Google 15-30 percent and Sabi 15-20 percent",
    "Provider presence-only status check",
    "Append-only ledger DB schema planning",
    "Server-side Google purchase verification contract planning",
    "Refund/void/chargeback contract planning",
    "Owner approval before any product activation or runtime route mount",
  ],
};

export function getStreamProductCatalogClassificationSourcePlan(): StreamProductCatalogClassificationSourcePlan {
  return STREAM_PRODUCT_CATALOG_CLASSIFICATION_SOURCE_PLAN;
}
