# OrderSnapshot v1

Status: stable

`OrderSnapshot` records the customer-visible ordering decision sent to a
handler. It preserves the established selection, input, quantity-provenance,
service, fallback, and utility concepts while using canonical `snake_case`
wire names.

The snapshot is evidence, not authority. Handler services must validate its
inputs and determine final rates, prices, charges, and fulfillment behavior.
Catalog rates, quantity bounds, and `advisory_amount` values therefore remain
advisory even though the browser records the exact calculation inputs and
result used for its preview.

The snapshot deliberately excludes editorial diagnostics. A missing,
throwing, or invalid browser expression prevents snapshot construction and is
reported through the structured expression host-configuration failure
contract instead.

## Compatibility

The v1 clean break does not accept legacy camel-case aliases. Bindings may
offer idiomatic language accessors, but their serialized representation must
match this contract losslessly.
