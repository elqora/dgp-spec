// SPDX-License-Identifier: GPL-3.0-only

/** A JSON integer represented by TypeScript's number type. @asType integer */
export type Integer = number;

/** Stable handler-assigned service identity. */
export type ServiceId = string | Integer;

/** Handler service availability states established by the backend SDK. */
export const HANDLER_SERVICE_STATES = ["enabled", "disabled", "locked"] as const;

export type HandlerServiceState = (typeof HANDLER_SERVICE_STATES)[number];

/** A named behavior exposed by a handler service. */
export interface ServiceCapability {
  id: string;
  enabled: boolean;
  description: string | null;
  meta: Record<string, any>;
}

/** Capabilities keyed by the same stable identifier carried by each value. */
export type ServiceCapabilities = Record<string, ServiceCapability>;

/**
 * Portable service-catalog representation reconciled from the backend SDK.
 *
 * Rates are handler-provided catalog data. They are not final prices or charges,
 * and browser consumers must not treat them as authoritative checkout totals.
 */
export interface HandlerService {
  id: ServiceId;
  name: string;
  description: string | null;
  category: string | null;
  rate: number | null;
  min: Integer;
  max: Integer;
  capabilities: ServiceCapabilities;
  meta: Record<string, any>;
  state: HandlerServiceState;
  state_reason: string | null;
}
