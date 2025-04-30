import { mockInvestimentos } from "../../infra/data/mockInvestimentos";
import { Investimento } from "../../domain/models/investimento";

export const getInvestimentos = (): Investimento[] => {
  return mockInvestimentos;
};
