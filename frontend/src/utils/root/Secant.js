import * as math from "mathjs"

function Secant(fx, x0, x1, error) {
    const results = []
    let ea = 1
    let iter = 0
    const maxIter = 100

    while (ea > error && iter < maxIter) {
        const f0 = math.evaluate(fx, { x: x0 })
        const f1 = math.evaluate(fx, { x: x1 })

        const xNew = x1 - (f1 * (x1 - x0)) / (f1 - f0)
        ea = math.abs((xNew - x1) / xNew)

        results.push({
            iter: iter,
            x: xNew.toFixed(6),
            fx: math.evaluate(fx, { x: xNew }).toFixed(6),
            err: ea.toFixed(8),
        });

        x0 = x1
        x1 = xNew
        iter++
    }

    return results
}

export default Secant