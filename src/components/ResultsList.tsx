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

import { Result, Situation } from "../lib/calculations"

interface ResultsListProps {
    result: Result
    offer: Situation
    current: Situation
}

export function ResultsList({ result, offer , current}: ResultsListProps) {
    return (
        <ul className="list-disc list-inside space-y-2">
            <li>
                {result.newHours === Infinity || isNaN(result.newHours)
                    ? "It's not possible to match the current efficiency with the new offer's hours."
                    : result.newHours !== offer.y
                        ? result.newHours < offer.y
                            ? `Reducing work hours to ${result.newHours.toFixed(2)} per day would match current efficiency (current offer: ${offer.y} hours).`
                            : `Work hours would need to be ${result.newHours.toFixed(2)} per day to match current efficiency (current offer: ${offer.y} hours).`
                        : "The current number of work hours maintains the same efficiency ratio."
                }
            </li>
            <li>
                {result.newDays === Infinity || isNaN(result.newDays)
                    ? "Adjusting work days won't improve the efficiency in this scenario."
                    : result.offerComparison === 'better'
                        ? `Increasing work days to ${result.newDays.toFixed(2)} would match current efficiency (current offer: ${offer.d} days).`
                        : result.offerComparison === 'worse'
                            ? `Reducing work days to ${result.newDays.toFixed(2)} would match current efficiency (current offer: ${offer.d} days).`
                            : `The current number of work days (${offer.d}) maintains the same efficiency ratio.`
                }
            </li>
            <li>
                {offer.xP === 0
                    ? (current.y < offer.y || current.d < offer.d)
                        ? "Due to higher work hours in the offer, even adding passive income cannot improve the efficiency ratio to match current."
                        : "Adding passive income would improve your efficiency ratio as it contributes to total income without time investment."
                    : result.incomeFactor === Infinity || isNaN(result.incomeFactor)
                        ? "Income adjustment can't be calculated for this scenario."
                        : result.offerComparison === 'better'
                            ? result.passiveToBreakeven > 0
                                ? `Additional passive income of $${result.passiveToBreakeven.toFixed(2)} would further improve efficiency.`
                                : `The current income mix provides a good efficiency ratio.`
                            : `Passive income needs to be $${((offer.xA + offer.xP) * result.incomeFactor - offer.xA).toFixed(2)} to ${result.offerComparison === 'equal' ? 'improve' : 'match current'} efficiency (current passive income: $${offer.xP.toFixed(2)}).`
                }
            </li>
        </ul>
    )
}