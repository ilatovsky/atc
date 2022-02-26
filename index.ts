function atc(amount: number, denominations: number[], needToSort = true) {
    let result = new Map<number, number>();
    if (amount === 0) {
        return result;
    }

    const sortedBanknotes = needToSort
        ? denominations.sort((a, b) => b - a)
        : denominations;

    let currentAmountOfLargestDenomination = Math.trunc(
        amount / sortedBanknotes[0]
    );
    while (currentAmountOfLargestDenomination >= 0) {
        try {
            const nextAtcResult = atc(
                amount -
                    currentAmountOfLargestDenomination * sortedBanknotes[0],
                denominations.slice(1),
                false
            );
            result = new Map([
                [sortedBanknotes[0], currentAmountOfLargestDenomination],
                ...nextAtcResult.entries(),
            ]);

            return result;
        } catch (e) {
            currentAmountOfLargestDenomination--;
        }
    }

    throw new Error("can't change");
}

const args = process.argv.slice(2);

const amount = Number(args[0]);
const denominations = [
    ...new Set(
        args[1]
            .split(",")
            .map(Number)
            .filter((denomination) => !Number.isNaN(denomination))
    ),
];

if (Number.isNaN(amount) || !denominations.length) {
    console.log(amount, denominations);

    throw Error("wrong args");
}

const result = atc(amount, denominations);

console.log(
    [
        Array.from(result.entries())
            .map(
                ([denomination, amount]) =>
                    amount && `${amount} by ${denomination}`
            )
            .filter(Boolean)
            .join(", "),
        `${Array.from(result.values()).reduce(
            (acc, item) => acc + item
        )} in total`,
    ].join("\n")
);
