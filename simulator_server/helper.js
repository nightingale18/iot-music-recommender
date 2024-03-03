const [mean, std, size] = [70.42, 9.95, 200];

function genNormDistrib(mean, std, size) {
    const probsDist = [];
    const pulseDist = [];
    const distribution = [];

    for (let el=12;el < size; el++) {
        let expDegree = -0.5*(((el-mean)/std)**2);
        let eq = (1/(std*Math.sqrt(2*Math.PI)))*Math.exp(expDegree);
        probsDist.push(eq);
        pulseDist.push(el);
    }
    for (let i = 0; i < probsDist.length; i++) {
        for (let j = 0; j < probsDist[i]; j++){
            distribution.push(i);
        }
    }
    return [distribution, pulseDist];
}

function getRandValue(distribution, pulseDist) {
    let index = distribution[Math.floor(distribution.length * Math.random())];
    return pulseDist[index];
}

const [distribution, pulseDist] = genNormDistrib(mean, std, size);
const [distribDiv, pulseDistDiv] = genNormDistrib(12, 10, 22);

module.exports = {distribution, pulseDist, getRandValue, genNormDistrib, distribDiv, pulseDistDiv};