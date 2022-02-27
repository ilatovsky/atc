export function formatResult(result: Map<number, number>) {
    return [
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
    ].join("\n");
}
