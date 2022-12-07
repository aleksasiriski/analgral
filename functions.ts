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

function partitionInterval(n: number, interval: Pair<number>, functionString: string) {
    let nextInterval: Pair<number> = interval
    let subIntervals: Pairs<number> = []
    for (let i: number = 0; i < n; i++) {
        let newIntervalLimit: number = randomNumber(nextInterval[0], nextInterval[1])
        subIntervals.push([nextInterval[0], newIntervalLimit])
        nextInterval = [newIntervalLimit, nextInterval[1]]
    }
    return subIntervals
}

function riemannSum(subIntervals: Pairs<number>, functionString: string) {
    let sum: number = 0
    subIntervals.forEach((subInterval) => {
        let c: number = randomNumber(subInterval[0], subInterval[1])
        sum += parseFunction(c, functionString) * (subInterval[1] - subInterval[0])
    })
    return sum
}