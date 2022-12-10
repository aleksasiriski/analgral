type Pair<a> = [a,a]
type Pairs<a> = Pair<a>[]

function randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min
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

function choosePoints(subIntervals: Pairs<number>) {
    let points: Pairs<number> = []
    subIntervals.forEach((subInterval) => {
        let c: number = randomNumber(subInterval[0], subInterval[1])
        let delta: number = subInterval[1] - subInterval[0]
        points.push([c, delta])
    })
    return points
}

function riemannSum(points: Pairs<number>, functionString: string) {
    let sum: number = 0
    points.forEach((point) => {
        sum += parseFunction(point[0], functionString) * point[1]
    })
    return sum
}

function combineIntervalsAndPoints(points: Pairs<number>, subIntervals: Pairs<number>) {
    let combined: number[] = []
    points.forEach((point) => {
        combined.push(point[0])
    })
    subIntervals.forEach((subInterval) => {
        combined.push(subInterval[0])
        combined.push(subInterval[1])
    })
    var unique = combined.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })
    return unique
}