# TIER Model Calculator

A web-based calculator for analyzing Time-Income Efficiency Ratios (TIER) to help evaluate different income scenarios and work-life balance decisions.

## Overview

The TIER Model Calculator helps you compare different work situations by calculating a ratio that measures how efficiently you're using your time to generate income. It takes into account both active income (requiring your time) and passive income (not requiring ongoing time investment).

The calculator compares two scenarios:
- Your current situation
- A potential new offer or alternative scenario

For each scenario, you can input:
- Passive Income (monthly)
- Active Income (monthly)
- Work Hours per Day
- Work Days per Month

## Key Features

- Interactive comparison of two income scenarios
- Automatic calculation of TIER ratios
- Visual representation of results through charts
- Detailed breakeven analysis
- Responsive design for desktop and mobile use
- Clean, light theme interface

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gehrkev/tier-model-calculator.git
cd tier-model-calculator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `out` directory.

## Understanding the Results

The calculator provides several key pieces of information:

1. TIER Ratio (R value)
   - Lower values indicate better time-income efficiency
   - R = 0 represents pure passive income (theoretically optimal)

2. Comparison Analysis
   - Whether the new offer improves your time-income efficiency
   - Breakeven points for different variables
   - Required adjustments to match current efficiency

3. Visual Representations
   - Bar charts comparing income and hours
   - Clear indicators of efficiency improvements or declines

## Project Structure

```
src/
├── app/                   # Next.js app directory
├── components/           
│   ├── NumericInput.tsx  # Reusable numeric input component
│   ├── ResultsCard.tsx   # Results display component
│   ├── ResultsChart.tsx  # Data visualization component
│   ├── SituationCard.tsx # Input form component
│   └── ui/               # Base UI components
├── lib/
│   ├── calculations.ts   # TIER model calculations
│   └── utils.ts          # Utility functions
```

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Data visualization
- [shadcn/ui](https://ui.shadcn.com/) - UI components

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- TIER Model mathematical foundation by Vitor André Gehrke
- UI components from [shadcn/ui](https://ui.shadcn.com/)
