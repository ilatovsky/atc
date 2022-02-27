export class Atc {
    #cache: Map<string, Map<number, number>>;

    constructor() {
        this.#cache = new Map();
    }

    static getProblemKey(amount: number, denominations: number[]) {
        return `${amount}|${denominations.join()}`;
    }

    static change(amount: number, denominations: number[]) {
        return (this instanceof Atc ? this : new Atc())._change(
            amount,
            denominations
        );
    }

    _change(amount: number, denominations: number[], needToSort = true) {
        let result = new Map<number, number>();

        if (amount === 0) {
            return result;
        }

        const sortedBanknotes = needToSort
            ? denominations.sort((a, b) => b - a)
            : denominations;

        if (this.#cache.has(Atc.getProblemKey(amount, sortedBanknotes))) {
            const result = this.#cache.get(
                Atc.getProblemKey(amount, sortedBanknotes)
            );
            return result as NonNullable<typeof result>;
        }

        let currentAmountOfLargestDenomination = Math.trunc(
            amount / sortedBanknotes[0]
        );
        while (currentAmountOfLargestDenomination >= 0) {
            try {
                const nextAtcResult = this._change(
                    amount -
                        currentAmountOfLargestDenomination * sortedBanknotes[0],
                    denominations.slice(1),
                    false
                );
                result = new Map([
                    [sortedBanknotes[0], currentAmountOfLargestDenomination],
                    ...nextAtcResult.entries(),
                ]);
                this.#cache.set(
                    Atc.getProblemKey(amount, sortedBanknotes),
                    result
                );
                return result;
            } catch (e) {
                currentAmountOfLargestDenomination--;
            }
        }

        throw new Error("can't change");
    }
}
