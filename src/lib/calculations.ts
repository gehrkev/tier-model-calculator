/**
 * @license
 * MIT License
 *
 * Copyright (c) 2024 Vitor André gehrke
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export type Situation = {
    xP: number
    xA: number
    y: number
    d: number
}

export function validateSituation(situation: Situation): boolean {
    return (
        situation.xP >= 0 &&
        situation.xA >= 0 &&
        situation.y >= 0 &&
        situation.y <= 24 &&
        situation.d >= 0 &&
        situation.d <= 30.44 &&
        isActiveComponentsConsistent(situation)
    )
}

function isActiveComponentsConsistent(situation: Situation): boolean {
    const hasZeroComponent = situation.xA === 0 || situation.y === 0 || situation.d === 0
    if (hasZeroComponent) {
        return situation.xA === 0 && situation.y === 0 && situation.d === 0
    }
    return true
}

export function clampSituation(situation: Situation): Situation {
    let clampedSituation = {
        xP: Math.max(0, situation.xP),
        xA: Math.max(0, situation.xA),
        y: Math.min(24, Math.max(0, situation.y)),
        d: Math.min(30.44, Math.max(0, situation.d))
    }

    // If any active component is zero, set all active components to zero
    if (clampedSituation.xA === 0 || clampedSituation.y === 0 || clampedSituation.d === 0) {
        clampedSituation = {
            ...clampedSituation,
            xA: 0,
            y: 0,
            d: 0
        }
    }

    return clampedSituation
}

export type Result = {
    incomeFactor: number,
    newHours: number,
    newDays: number,
    requiredPassive: number,
    offerComparison: 'better' | 'worse' | 'equal',
    currentR: number,
    offerR: number,
    passiveToBreakeven: number
}

export function calculateR(xP: number, xA: number, y: number, d: number, H: number = 24): number {
    // Ensure consistency in active components
    if (xA === 0 || y === 0 || d === 0) {
        xA = 0
        y = 0
        d = 0
    }

    xP = Math.max(0, xP)
    xA = Math.max(0, xA)
    y = Math.min(24, Math.max(0, y))
    d = Math.min(30.44, Math.max(0, d))

    // Early returns for special cases
    if (xA === 0 && xP === 0) return 0  // No income at all
    if (xA === 0) return 0  // Pure passive income
    if (y === 0 || d === 0) return 0  // No time invested

    // Calculate rates
    const ra = y * d === 0 ? 0 : xA / (y * d)
    const re = H * 30.44 === 0 ? 0 : (xP + xA) / (H * 30.44)

    // Handle division by zero cases
    if (re === 0) return Infinity  // Avoid division by zero
    if (ra === 0) return 0  // No active income rate

    return ra / re
}

export function findBreakevenPoint([xPCurrent, xACurrent, yCurrent, dCurrent]: number[], [xPOffer, xAOffer, yOffer, dOffer]: number[]): Result {
    // Ensure consistency in active components for current situation
    if (xACurrent === 0 || yCurrent === 0 || dCurrent === 0) {
        xACurrent = 0
        yCurrent = 0
        dCurrent = 0
    }

    // Ensure consistency in active components for offer
    if (xAOffer === 0 || yOffer === 0 || dOffer === 0) {
        xAOffer = 0
        yOffer = 0
        dOffer = 0
    }

    xPCurrent = Math.max(0, xPCurrent)
    xACurrent = Math.max(0, xACurrent)
    yCurrent = Math.min(24, Math.max(0, yCurrent))
    dCurrent = Math.min(30.44, Math.max(0, dCurrent))

    xPOffer = Math.max(0, xPOffer)
    xAOffer = Math.max(0, xAOffer)
    yOffer = Math.min(24, Math.max(0, yOffer))
    dOffer = Math.min(30.44, Math.max(0, dOffer))

    const RCurrent = calculateR(xPCurrent, xACurrent, yCurrent, dCurrent)
    const ROffer = calculateR(xPOffer, xAOffer, yOffer, dOffer)

    let offerComparison: 'better' | 'worse' | 'equal'
    if (ROffer < RCurrent) {
        offerComparison = 'better'
    } else if (ROffer > RCurrent) {
        offerComparison = 'worse'
    } else {
        offerComparison = 'equal'
    }

    const newHours = ROffer !== 0 && dCurrent !== 0 && yCurrent !== 0 ? (RCurrent * yOffer * dOffer) / (ROffer * dCurrent) : Infinity
    const newDays = ROffer !== 0 && yCurrent !== 0 && dCurrent !== 0 ? (RCurrent * yOffer * dOffer) / (ROffer * yCurrent) : Infinity
    const incomeFactor = ROffer !== 0 && (xAOffer + xPOffer) !== 0 ? RCurrent / ROffer : Infinity
    const requiredPassive = yOffer !== 0 && dOffer !== 0
        ? (RCurrent * xAOffer * 24 * 30.44 / (yOffer * dOffer)) - xAOffer - xPOffer
        : Infinity
    const passiveToBreakeven = yOffer !== 0 && dOffer !== 0
        ? (ROffer * xAOffer * 24 * 30.44 / (yOffer * dOffer)) - xAOffer - xPOffer
        : Infinity

    return {
        incomeFactor,
        newHours: Math.min(24, newHours),
        newDays: Math.min(30.44, newDays),
        requiredPassive: Math.max(0, requiredPassive),
        offerComparison,
        currentR: RCurrent,
        offerR: ROffer,
        passiveToBreakeven: Math.max(0, passiveToBreakeven)
    }
}