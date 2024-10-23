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

import { useState } from 'react'
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { SituationCard } from "./SituationCard"
import { ResultsCard } from "./ResultsCard"
import { Situation, Result, findBreakevenPoint } from "@/lib/calculations"

export default function TIERCalculator() {
    const [current, setCurrent] = useState<Situation>({
        xP: 0,
        xA: 5000,
        y: 8,
        d: 22
    })

    const [offer, setOffer] = useState<Situation>({
        xP: 0,
        xA: 6000,
        y: 9,
        d: 22
    })

    const [result, setResult] = useState<Result | null>(null)
    const [isCalculating, setIsCalculating] = useState(false)

    const handleCalculate = () => {
        setIsCalculating(true)
        setTimeout(() => {
            const currentArray = [current.xP, current.xA, current.y, current.d]
            const offerArray = [offer.xP, offer.xA, offer.y, offer.d]
            setResult(findBreakevenPoint(currentArray, offerArray))
            setIsCalculating(false)
        }, 500)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">TIER Model Calculator</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SituationCard
                    type="current"
                    values={current}
                    onChange={setCurrent}
                />
                <SituationCard
                    type="offer"
                    values={offer}
                    onChange={setOffer}
                />
            </div>
            <div className="mt-4">
                <Button onClick={handleCalculate} disabled={isCalculating}>
                    {isCalculating ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            Calculating
                        </>
                    ) : (
                        'Calculate'
                    )}
                </Button>
            </div>
            {result && !isCalculating && (
                <ResultsCard
                    result={result}
                    current={current}
                    offer={offer}
                />
            )}
        </div>
    )
}
