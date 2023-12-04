function tsp_hk(distance_matrix) {
    var n = distance_matrix.length;
    var memo = {};

    function heldKarp(cities, start) {
        if (cities.size === 2) {
            let it = cities.values();
            let city1 = it.next().value;
            let city2 = it.next().value;
            return distance_matrix[city1][city2];
        }

        let key = JSON.stringify([Array.from(cities).sort(), start]);
        if (memo[key] !== undefined) {
            return memo[key];
        } 

        let minDistance = Infinity;
        for (let city of cities) {
            if (city === start) continue;
            let newCities = new Set(cities);
            newCities.delete(start);
            let distance = distance_matrix[start][city] + heldKarp(newCities, city);
            minDistance = Math.min(minDistance, distance);
        }

        memo[key] = minDistance;
        return minDistance;
    }

    let minTourLength = Infinity;
    for (let start = 0; start < n; start++) {
        let cities = new Set();
        for (let i = 0; i < n; i++) {
            cities.add(i);
        }
        let tourLength = heldKarp(cities, start);
        minTourLength = Math.min(minTourLength, tourLength);
    }

    if (minTourLength === Infinity) {
        return 0;
    }

    return minTourLength;
}
