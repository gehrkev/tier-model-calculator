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

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card"
import { ResultsExplanation } from "./ResultsExplanation"
import { ResultsList } from "./ResultsList"
import { ResultsChart } from "./ResultsChart"
import { Result, Situation } from "../lib/calculations"

interface ResultsCardProps {
    result: Result
    current: Situation
    offer: Situation
}

export function ResultsCard({ result, current, offer }: ResultsCardProps) {
    const chartData = [
        { name: 'Current', income: current.xA + current.xP, hours: current.y, r: result.currentR },
        { name: 'Offer', income: offer.xA + offer.xP, hours: offer.y, r: result.offerR },
        { name: 'Breakeven', income: offer.xA + offer.xP, hours: result.newHours, r: result.currentR },
    ]

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>
                    {result.offerComparison === 'better' && "The offer improves your time-income efficiency ratio."}
                    {result.offerComparison === 'worse' && "The offer does not improve your time-income efficiency ratio in its current form."}
                    {result.offerComparison === 'equal' && "The offer is equivalent to your current situation in terms of time-income efficiency."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-4">
                    Current R: {result.currentR.toFixed(4)}, Offer R: {result.offerR.toFixed(4)}
                </p>
                <ResultsExplanation offerComparison={result.offerComparison} />
                <ResultsList result={result} offer={offer} current={current}/>
                {result.offerR === 0 && (
                    <p className="mt-4">
                        The offer consists of only passive income. This is the optimal scenario
                        as you&apos;re earning money without time investment. However, keep in mind that in real life,
                        passive income often requires some time for management and maintenance.
                    </p>
                )}
            </CardContent>
            <CardFooter>
                <ResultsChart data={chartData} />
            </CardFooter>
        </Card>
    )
}
