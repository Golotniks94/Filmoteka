function roundToTenth(number){
    if(isNaN(number) || !(typeof number === 'number')){
        return NaN;
    }
    number=Math.round(number*10)/10;
    return number;
}

export {roundToTenth};