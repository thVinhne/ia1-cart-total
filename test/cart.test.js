import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

// Keep the starter's worked example as an acceptance test.
test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 467400)
})

const standardOptions = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

test('result has number type', () => {
  assert.equal(typeof cartTotal([{ price: 180000, qty: 1 }], standardOptions), 'number')
})

test('empty cart costs nothing even when shipping would be charged', () => {
  assert.equal(cartTotal([], standardOptions), 0)
})

test('empty cart accepts the slides example with only vatRate', () => {
  assert.equal(cartTotal([], { vatRate: 0.08 }), 0)
})

test('shipping is charged one dong below the threshold', () => {
  assert.equal(cartTotal([{ price: 499999, qty: 1 }], standardOptions), 569999)
})

test('shipping is free exactly at the threshold', () => {
  assert.equal(cartTotal([{ price: 250000, qty: 2 }], standardOptions), 540000)
})

test('shipping is free above the threshold', () => {
  assert.equal(cartTotal([{ price: 500001, qty: 1 }], standardOptions), 540001)
})

test('threshold uses subtotal even when VAT pushes the total above it', () => {
  assert.equal(cartTotal([{ price: 480000, qty: 1 }], standardOptions), 548400)
})

test('negative price throws RangeError', () => {
  assert.throws(() => cartTotal([{ price: -1, qty: 1 }], standardOptions), RangeError)
})

test('negative price in a later item also throws RangeError', () => {
  const items = [{ price: 100, qty: 1 }, { price: -1, qty: 1 }]
  assert.throws(() => cartTotal(items, standardOptions), RangeError)
})

for (const [label, qty] of [
  ['fractional', 1.5],
  ['zero', 0],
  ['negative', -1],
  ['NaN', NaN],
  ['infinite', Infinity],
  ['string', '2'],
]) {
  test(`${label} quantity throws RangeError`, () => {
    assert.throws(() => cartTotal([{ price: 100, qty }], standardOptions), RangeError)
  })
}

test('invalid quantity in a later item also throws RangeError', () => {
  const items = [{ price: 100, qty: 1 }, { price: 100, qty: 0 }]
  assert.throws(() => cartTotal(items, standardOptions), RangeError)
})

test('zero price is allowed and shipping still applies to a nonempty cart', () => {
  assert.equal(cartTotal([{ price: 0, qty: 1 }], standardOptions), 30000)
})

test('rounds down when the final fractional total is below half', () => {
  const options = { vatRate: 0, freeShipFrom: 100, shipFee: 0 }
  assert.equal(cartTotal([{ price: 10.49, qty: 1 }], options), 10)
})

test('rounds up at half a dong', () => {
  const options = { vatRate: 0, freeShipFrom: 100, shipFee: 0 }
  assert.equal(cartTotal([{ price: 10.5, qty: 1 }], options), 11)
})

test('rounds only the final total rather than rounding VAT separately', () => {
  const options = { vatRate: 0.2, freeShipFrom: 100, shipFee: 0.1 }
  assert.equal(cartTotal([{ price: 1.2, qty: 1 }], options), 2)
})

test('shipping threshold uses the unrounded subtotal', () => {
  const options = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal([{ price: 499999.6, qty: 1 }], options), 530000)
})
