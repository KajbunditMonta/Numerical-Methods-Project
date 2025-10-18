import { evaluate, derivative } from "mathjs"

function Newton (fx, x0, error) {
    let x = x0
    let ea = 1
    let iter = 0
    const maxIter = 100
    const results = []

    while (ea > error && iter < maxIter) {
        const fValue = evaluate(fx, { x })
        const dfValue = derivative(fx, "x").evaluate({ x })

        const xNew = x - fValue / dfValue
        ea = Math.abs((xNew - x) / xNew)

        results.push({
            iter,
            x: xNew.toFixed(6),
            fx: fValue.toFixed(6),
            err: ea.toFixed(8),
        });

        x = xNew;
        iter++;
    }

    return results;
}

export default Newton