function randomNumber(A, B) {
    return math.random() * (B - A) + A
}

function fOfX(x, F) {
    return F.evaluate({ x: x })
}

async function partitionIntervalEvenly(N, A, B) {
    let sizeOfInterval = (B - A) / N
    let nextInterval = A
    let subIntervals = []
    for (let i = 0; i < N - 1; i++) {
        var newIntervalLimit = nextInterval + sizeOfInterval
        subIntervals.push([nextInterval, newIntervalLimit])
        nextInterval = newIntervalLimit
    }
    subIntervals.push([newIntervalLimit, B])
    return subIntervals
}

async function partitionIntervalRandomly(N, A, B) {
    let nextInterval = A
    let subIntervals = []
    for (let i = 0; i < N - 1; i++) {
        var newIntervalLimit = randomNumber(nextInterval, B)
        subIntervals.push([nextInterval, newIntervalLimit])
        nextInterval = newIntervalLimit
    }
    subIntervals.push([newIntervalLimit, B])
    return subIntervals
}

async function partitionInterval(N, A, B, evenly = true) {
    if (evenly) {
        return await partitionIntervalEvenly(N, A, B)
    } else {
        return await partitionIntervalRandomly(N, A, B)
    }
    
}

async function choosePoints(subIntervals) {
    let points = []
    subIntervals.forEach((subInterval) => {
        let c = randomNumber(subInterval[0], subInterval[1])
        let delta = subInterval[1] - subInterval[0]
        points.push([c, delta])
    })
    return points
}

async function generateIntervalsArray(subIntervals) {
    let combined = []
    subIntervals.forEach((subInterval) => {
        combined.push(subInterval[0])
        combined.push(subInterval[1])
    })
    let unique = combined.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
    }).sort()
    return unique
}

async function generatePointsArray(points) {
    let combined = []
    points.forEach((point) => {
        combined.push(point[0])
    })
    let unique = combined.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
    }).sort()
    return unique
}

async function calculateRiemannSum(points, F) {
    let sum = 0
    points.forEach((point) => {
        sum += fOfX(point[0], F) * point[1]
    })
    return sum
}

async function calculateDefiniteIntegral(A, B, Fdx) {
    return Fdx.evaluate({ x: B }) - Fdx.evaluate({ x: A })
}