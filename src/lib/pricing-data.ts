export interface PricingTier {
  capital: number;
  capitalFormatted: string;
  fee: number;
  feeFormatted: string;
  popular?: boolean;
}

export const pricingTiers: PricingTier[] = [
  { capital: 3000, capitalFormatted: "3,000$", fee: 39, feeFormatted: "39$" },
  { capital: 10000, capitalFormatted: "10,000$", fee: 111, feeFormatted: "111$" },
  { capital: 50000, capitalFormatted: "50,000$", fee: 555, feeFormatted: "555$", popular: true },
  { capital: 100000, capitalFormatted: "100,000$", fee: 1111, feeFormatted: "1,111$" },
  { capital: 500000, capitalFormatted: "500,000$", fee: 5555, feeFormatted: "5,555$" },
];

export const tradingRules = {
  phase1: {
    profitTarget: 3,
    maxDrawdown: 1,
  },
  phase2: {
    profitTarget: 9,
    maxDrawdown: 3,
  },
  funded: {
    withdrawalTarget: 10,
    maxDrawdown: 10,
  },
};

export const getPhaseRules = (capital: number) => {
  return {
    phase1: {
      profitAmount: (capital * tradingRules.phase1.profitTarget) / 100,
      drawdownAmount: (capital * tradingRules.phase1.maxDrawdown) / 100,
    },
    phase2: {
      profitAmount: (capital * tradingRules.phase2.profitTarget) / 100,
      drawdownAmount: (capital * tradingRules.phase2.maxDrawdown) / 100,
    },
    funded: {
      withdrawalAmount: (capital * tradingRules.funded.withdrawalTarget) / 100,
      drawdownAmount: (capital * tradingRules.funded.maxDrawdown) / 100,
    },
  };
};
