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

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { NumericInput } from "./NumericInput"
import { Situation } from "@/lib/calculations"

interface SituationCardProps {
    type: 'current' | 'offer'
    values: Situation
    onChange: React.Dispatch<React.SetStateAction<Situation>>
}

export function SituationCard({ type, values, onChange }: SituationCardProps) {
    const handleInputChange = (field: keyof Situation) => (value: string) => {
        const numValue = value === '' ? 0 : parseFloat(value)

        // If changing an active income component to zero, zero out all active components
        if ((field === 'xA' || field === 'y' || field === 'd') && numValue === 0) {
            onChange(prev => ({
                ...prev,
                xA: 0,
                y: 0,
                d: 0
            }))
            return
        }

        // If changing an active income component from zero, ensure other components are non-zero
        if ((field === 'xA' || field === 'y' || field === 'd') && numValue > 0) {
            onChange(prev => ({
                ...prev,
                [field]: numValue,
                // Only set defaults if the other fields are currently zero
                xA: field === 'xA' ? numValue : (prev.xA || 5000),
                y: field === 'y' ? numValue : (prev.y || 8),
                d: field === 'd' ? numValue : (prev.d || 22)
            }))
            return
        }

        // Normal case - just update the single field
        onChange(prev => ({ ...prev, [field]: numValue }))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{type === 'current' ? 'Current Situation' : 'New Offer'}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <NumericInput
                        id={`${type}-xp`}
                        label="Passive Income"
                        value={values.xP}
                        onChange={handleInputChange('xP')}
                        min={0}
                    />
                    <NumericInput
                        id={`${type}-xa`}
                        label="Active Income"
                        value={values.xA}
                        onChange={handleInputChange('xA')}
                        min={0}
                    />
                    <NumericInput
                        id={`${type}-y`}
                        label="Hours per Day"
                        value={values.y}
                        onChange={handleInputChange('y')}
                        min={0}
                        max={24}
                    />
                    <NumericInput
                        id={`${type}-d`}
                        label="Days per Month"
                        value={values.d}
                        onChange={handleInputChange('d')}
                        min={0}
                        max={30.44}
                        isDaysInput={true}
                    />
                </div>
            </CardContent>
        </Card>
    )
}