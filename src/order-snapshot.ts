// SPDX-License-Identifier: GPL-3.0-only

import type { JsonValue } from "./json.js";
import type {
  ProductDefinitionSchemaVersion,
  QuantityRule,
  ServiceFallbacks,
  UtilityMode,
} from "./product-definition.js";
import type { Integer, ServiceId } from "./service.js";

export const ORDER_SNAPSHOT_VERSION = "1" as const;

export type OrderSnapshotVersion = typeof ORDER_SNAPSHOT_VERSION;

export type OrderSnapshotMode = "prod" | "dev";

export interface OrderSnapshotFieldSelection {
  field_id: string;
  field_type: string;
  selected_option_ids: string[];
}

export interface OrderSnapshotSelection {
  filter_id: string;
  trigger_ids: string[];
  fields: OrderSnapshotFieldSelection[];
}

export interface OrderSnapshotInputs {
  form: Record<string, JsonValue>;
  selections: Record<string, string[]>;
}

export type OrderSnapshotQuantitySource =
  | {
      kind: "field_rule";
      node_id: string;
      rule: QuantityRule;
      defaulted_from_host: false;
    }
  | {
      kind: "option_default" | "field_default" | "filter_default";
      node_id: string;
      rule: null;
      defaulted_from_host: false;
    }
  | {
      kind: "host_default";
      node_id: null;
      rule: null;
      defaulted_from_host: true;
    };

export interface OrderSnapshotUtilityInputs {
  quantity: number;
  value: number | null;
  value_by: "value" | "length" | null;
  base_amount: number | null;
}

/**
 * An exact browser-calculated utility line. `advisory_amount` is evidence for
 * previews and handlers must still calculate the authoritative charge.
 */
export interface OrderSnapshotUtility {
  node_id: string;
  mode: UtilityMode;
  rate: number;
  percent_base: "service_total" | "base_service" | "all" | null;
  label: string | null;
  inputs: OrderSnapshotUtilityInputs;
  advisory_amount: number;
}

/** Portable customer-order evidence for handler validation and fulfillment. */
export interface OrderSnapshot {
  version: OrderSnapshotVersion;
  mode: OrderSnapshotMode;
  /** @format date-time */
  built_at: string;
  product_id: string | Integer;
  definition_schema_version: ProductDefinitionSchemaVersion;
  selection: OrderSnapshotSelection;
  inputs: OrderSnapshotInputs;
  quantity: number;
  quantity_source: OrderSnapshotQuantitySource;
  min: Integer;
  max: Integer;
  service_ids: ServiceId[];
  service_ids_by_node: Record<string, ServiceId[]>;
  fallbacks: ServiceFallbacks | null;
  utilities: OrderSnapshotUtility[];
  meta: Record<string, any>;
}
