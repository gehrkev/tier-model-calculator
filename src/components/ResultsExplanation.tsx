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

interface ResultsExplanationProps {
    offerComparison: 'better' | 'worse' | 'equal'
}

export function ResultsExplanation({ offerComparison }: ResultsExplanationProps) {
    return (
        <>
            <p className="mb-4">
                The R value shows how efficiently you're using your time to earn money. While it can be tricky
                to understand at first, it measures the relationship between your total income (both passive
                and active) and the time invested in active income. A lower R means better efficiency - like
                a golf score, the lower the better.
            </p>
            <p className="mb-4">
                Increasing passive income improves (lowers) your R score because it adds to your total income
                without requiring additional time investment. Changes in work hours and active income will
                also affect your efficiency, but in more complex ways since active income requires time investment.
            </p>
            <p className="mb-4">
                {offerComparison === 'better' && "Good news! The offer improves your time-income balance. Here are the details:"}
                {offerComparison === 'worse' && "The offer doesn't improve your time-income balance as is. Here's what would need to change to make it worthwhile:"}
                {offerComparison === 'equal' && "The offer is equal to your current situation in terms of time-income balance. Here are the details:"}
            </p>
        </>
    )
}