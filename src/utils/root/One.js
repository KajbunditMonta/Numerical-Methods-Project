import * as math from 'mathjs'

function OneUtils (fx, Xstart, Error) {

    const result = []
    const fxc = math.compile(fx)
    let eps = Infinity
    let xold = Xstart
    let xi
    let i = 0

    while (eps > Error && i < 1000) {

        xi = fxc.evaluate({x : xold})
        eps = math.abs( (xi - xold) / xi)
        xold = xi

        result.push({
            iter : i++,
            x : format(xi),
            err : format(eps)
        })

    }
    
    return result

}

function format (num) {

    if (Number.isInteger(num)) {
        return num.toFixed(0)
    }
    else {
        return num.toFixed(6)
    }

}

export default OneUtils