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

function partitionInterval(n: number, interval: Pair<number>) {
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

function generateIntervalsArray(subIntervals: Pairs<number>) {
    let combined: number[] = []
    subIntervals.forEach((subInterval) => {
        combined.push(subInterval[0])
        combined.push(subInterval[1])
    })
    let unique = combined.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })
    return unique
}

function generatePointsArray(points: Pairs<number>) {
    let combined: number[] = []
    points.forEach((point) => {
        combined.push(point[0])
    })
    let unique = combined.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })
    return unique
}

function calculateRiemannSum(points: Pairs<number>, functionString: string) {
    let sum: number = 0
    points.forEach((point) => {
        sum += parseFunction(point[0], functionString) * point[1]
    })
    return sum
}

function calculateDefiniteIntegral(N: number, [A, B]: Pair<number>, functionString: string) {
    let i: number, z: number, h: number, s: number
    N = N + N
    s = parseFunction(A, functionString) * parseFunction(B, functionString)
    h = (B - A) / N
    z = 4
    for (i = 1; i < N; i += 1) {
       s = s + z * parseFunction(A + i * h, functionString)
       z = 6 - z
    }
    return (s * h) / 3
}

function calculate(N: number, A: number, B: number, F: string) {
    const subIntervals: Pairs<number> = partitionInterval(N, [A, B])
    const points: Pairs<number> = choosePoints(subIntervals)

    const intervalsArray: number[] = generateIntervalsArray(subIntervals)
    const pointsArray: number[] = generatePointsArray(points)

    const riemannSum: number = calculateRiemannSum(points, F)
    const integral: number = calculateDefiniteIntegral(N, [A, B], F)
    const delta: number = Math.abs(riemannSum - integral)
}