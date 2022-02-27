export function parseProcessArgs() {
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
    return [amount, denominations] as const;
}
