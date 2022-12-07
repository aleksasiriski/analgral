type Pair<a> = [a,a];
type Pairs<a> = Pair<a>[];

function randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function parseFunction(x: number, functionString: string) {
    let parsedFunction = functionString
    parsedFunction.replaceAll('x', x.toString())
    return eval(parsedFunction)
}

function riemannSum(subintervals: Pairs<number>, functionString: string) {
    let sum: number = 0
    subintervals.forEach((subinterval) => {
        let min: number, max: number
        if (subinterval[0] < subinterval[1]) {
            min = subinterval[0]
            max = subinterval[1]
        } else {
            max = subinterval[0]
            min = subinterval[1]
        }
        let c: number = randomNumber(min, max)
        sum += parseFunction(c, functionString) * (max - min)
    })
    return sum
}