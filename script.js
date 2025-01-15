//ベクトルの計算式
console.log("script is running")

//pythonで言うrangeの関数
function range(n){
    return Array.from({length: n}, (v, k) => k);
}
//ベクトルのプログラム↓
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

class Vector{
    constructor(line, column, index = undefined, random = false){
        this.line = line;
        this.column = column;
        this.vector = [];
        if (index == undefined){
            for (var i = 0; i < line; i++){
                var columnsList = [];
                for (var i2 = 0; i2 < column; i2++){
                    if (random){
                        columnsList.push(getRandomArbitrary(-1, 1))
                    }else{
                        columnsList.push(0)
                    }
                }
                this.vector.push(columnsList)
            }
        }else{
            this.vector = index
        }   
    }

    getElem(lineIn, columnIn){
        if (lineIn == undefined){
            var forReturn = [];
            for (var i = 0;i < this.vector.length;i ++){
                forReturn.push(this.vector[i][columnIn]);
            }
            return forReturn
        }else if (columnIn == undefined){
            return this.vector[lineIn]
        }
        return this.vector[lineIn][columnIn]
    }

    setAll(newVec){
        this.vector = newVec
    }

    setElem(lineIn, columnIn, num){
        this.vector[lineIn][columnIn] = num
    }

    setLines(lineIn, list){
        var newList = []
        for (var i = 0; i < this.line; i++){
            var newNum = 0;
            if (list[i] != undefined){
                newNum = list[i]
            }
            newList.push(newNum)
        }
        for (var i = 0; i < this.line; i++){
            this.vector[i][lineIn] = newList[i]
        }
    }

    setColumns(columnIn, list){
        var newList = [];
        for (var i = 0; i < this.column;i ++){
            var newNum = 0;
            if (list[i] != undefined){
                newNum = list[i]
            }
            newList.push(newNum)
        }
        this.vector[columnIn] = newList;
    }
}

class OperateVector{
    add(a, b){
        var newVec = []
        if (a.line == b.line && a.column == b.column){
            for (var vertical = 0;vertical < a.line; vertical ++){
                var verticalVec = []
                for (var beside = 0;beside < a.column; beside ++){
                    verticalVec.push(a.vector[vertical][beside] + b.vector[vertical][beside])
                }
                newVec.push(verticalVec)
            }
            return new Vector(a.line, a.column, newVec)
        }else{
            console.error("private:OperateVector/add/->a and b is not similar")
        }
        return newVec
    }
    scalarTimes(a, s){
        var newVec = []
        for (var vertical in a.vector){
            var verticalVec = [];
            for (var beside in a.vector[vertical]){
                verticalVec.push(a.vector[vertical][beside] * s)
            }
            newVec.push(verticalVec)
        }
        return new Vector(a.line, a.column, newVec)
    }
    times(a, b){
        var newVec = []
        if (a.column == b.line){
            //Aのすべての列で、
            for (var AcolVec in a.vector){
                var newBesideVec = []
                //Bのすべての行で、
                for (var BlineVec = 0;BlineVec < b.column;BlineVec ++){
                    var total = 0
                    //（Aのすべての列で）Aのすべての行で
                    for (var AtheVec in a.vector[AcolVec]){
                        total += b.getElem(undefined, BlineVec)[AtheVec] * a.vector[AcolVec][AtheVec]
                    }
                    newBesideVec.push(total)
                }
                newVec.push(newBesideVec)
            }
        }else{
            console.error("we cant caculate this vectors")
        }
        return new Vector(newVec.length, newVec[0].length, newVec)
    }
}

var vectorCalculation = new OperateVector();