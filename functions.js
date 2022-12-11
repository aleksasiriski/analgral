var random = new Alea()

function randomNumber(A, B) {
    return random() * (B - A) + A
}

function fOfX(x, F) {
    return F.evaluate({ x: x })
}

function partitionInterval(N, A, B) {
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

function choosePoints(subIntervals) {
    let points = []
    subIntervals.forEach((subInterval) => {
        let c = randomNumber(subInterval[0], subInterval[1])
        let delta = subInterval[1] - subInterval[0]
        points.push([c, delta])
    })
    return points
}

function generateIntervalsArray(subIntervals) {
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

function generatePointsArray(points) {
    let combined = []
    points.forEach((point) => {
        combined.push(point[0])
    })
    let unique = combined.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
    }).sort()
    return unique
}

function calculateRiemannSum(points, F) {
    let sum = 0
    points.forEach((point) => {
        sum += fOfX(point[0], F) * point[1]
    })
    return sum
}

function calculateDefiniteIntegral(N, A, B, F) {
    let i, z, h, s
    N = N + N
    s = fOfX(A, F) * fOfX(B, F)
    h = (B - A) / N
    z = 4
    for (i = 1; i < N; i += 1) {
        s = s + z * fOfX(A + i * h, F)
        z = 6 - z
    }
    return (s * h) / 3
}