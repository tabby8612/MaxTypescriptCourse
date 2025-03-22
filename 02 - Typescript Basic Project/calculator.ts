type Data = {
  initialAmount: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
};

type Result = {
  year: number;
  totalAmount: number;
  totalInterestEarned: number;
  totalContribution: number;
};

function calculateInvestment(data: Data): Result[] | string {
  const { initialAmount, annualContribution, expectedReturn, duration } = data;

  if (initialAmount < 0) return "Initial amount must be atleast zero";

  if (duration <= 0) return "No valid amount of years provided.";

  if (expectedReturn < 0) return "Expected return must be atleast zero.";

  let total = initialAmount;
  let totalInterestEarned: number = 0;
  let totalContribution = annualContribution;

  const annualResults: Result[] = [];

  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn);
    totalInterestEarned = total - totalContribution - initialAmount;
    totalContribution = totalContribution + annualContribution;
    total = total + totalContribution;

    annualResults.push({
      year: i + 1,
      totalAmount: total,
      totalInterestEarned,
      totalContribution,
    });
  }

  return annualResults;
}

function printResults(results: Result[] | string) {
  if (typeof results === "string") {
    console.log(results);
    return;
  }

  for (const yearEndResult of results) {
    console.log("Year is: ", yearEndResult.year);
    console.log("Total Contributions", yearEndResult.totalContribution);
    console.log("Total Interest Earned", yearEndResult.totalInterestEarned);
    console.log(`------------------`);
  }
}

const investmentData: Data = {
  initialAmount: 5000,
  annualContribution: 500,
  expectedReturn: 0.08,
  duration: 10,
};

const results = calculateInvestment(investmentData);

printResults(results);
