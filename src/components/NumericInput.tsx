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

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"

interface NumericInputProps {
    id: string
    label: string
    value: number
    onChange: (value: string) => void
    min?: number
    max?: number
    isDaysInput?: boolean
}

export function NumericInput({
                                 id,
                                 label,
                                 value,
                                 onChange,
                                 min,
                                 max,
                                 isDaysInput
                             }: NumericInputProps) {
    const [isEmptyEditing, setIsEmptyEditing] = useState(false)

    const handleDaysValue = (numValue: number): number => {
        if (!isDaysInput) return numValue
        return Math.min(30.44, Math.max(0, numValue))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value

        if (inputValue === '') {
            setIsEmptyEditing(true)
            onChange('')
        } else {
            setIsEmptyEditing(false)
            const numValue = parseFloat(inputValue)
            if (!isNaN(numValue)) {
                let clampedValue = numValue
                if (min !== undefined && max !== undefined) {
                    clampedValue = Math.min(max, Math.max(min, numValue))
                } else if (min !== undefined) {
                    clampedValue = Math.max(min, numValue)
                } else if (max !== undefined) {
                    clampedValue = Math.min(max, numValue)
                }

                const finalValue = handleDaysValue(clampedValue)
                onChange(finalValue.toString())
            }
        }
    }

    const displayValue = isEmptyEditing ? '' : value

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type="number"
                value={displayValue}
                onChange={handleChange}
                onBlur={(e) => {
                    setIsEmptyEditing(false)
                    if (e.target.value === '') {
                        onChange('0')
                    }
                }}
                min={min}
                max={max}
                step={1}
            />
        </div>
    )
}