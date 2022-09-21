declare global {
    interface Array<T> {
        indexOfKey(key: keyof this[0] | "", value: any): number
        findSingle(key: keyof this[0] | "", value: this[0][keyof this[0]]): this[0]
        findMulti(key: keyof this[0] | "",  value: this[0][keyof this[0]] | this[0][keyof this[0]][]): this
        findMultiForObject(obj: Array<any>, find: any, type: 'number' | 'string'): Array<any>
        orderBy(key: keyof this[0] | "", sort_type: `asc` | `desc`): this
        serializeObject(): object,
        remove(index: number, deleteCount?: number): void;
    }
}

Array.prototype.indexOfKey = function (key, value) {
    return typeof value === "undefined" ? -1 : this.map(data => {
        return (key === "")
            ? data.toString()
            : (typeof data[key] !== undefined)
                ? data[key].toString()
                : -1;
    }).indexOf(value.toString());
}

Array.prototype.findSingle = function (key, value) {
    return this.find(function(data, index){
        data._index = index;
        return typeof value === "undefined" ? undefined : ((key === "") ? data.toString() : data[key].toString()) == value.toString()
    });
}
Array.prototype.findMulti = function (key, value) {
    let founds = Array();
    this.find(function(data, index){
        let query = ((Array.isArray(value)) ? value.includes(((key === "") ? data.toString() : data[key].toString())) : ((key === "") ? data.toString() : data[key].toString()) == value.toString());
        data = Object.assign(data, {_index: index});
        if(query) founds.push(data);
    });
    return founds;
}
Array.prototype.orderBy = function (key, sort_type) {
    return this.sort(function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (sort_type === "desc") ? (comparison * -1) : comparison
        );
    });
}
Array.prototype.findMultiForObject = function (obj: Array<any>, find: any, type: 'number' | 'string' = 'string'){
    let query = '';
    let multi_find = false;
    for (const key in find) {
        if (find[key] instanceof Array && find[key].length > 0){
            multi_find = true
            if (type == 'string') query += `[${find[key].map((e:any)=>`'${e}'`)}].includes(a['${key}']) || `
            if (type == "number") query += `[${find[key].map((e:any)=>`${e}`)}].includes(a['${key}']) || `
        }else {
            query += `a['${key}']=='${find[key]}' && `
        }
    }
    query = query.slice(0,-3)
    return obj.filter(e => eval(query));
}
Array.prototype.serializeObject = function () {
    let result: any = {};
    this.forEach((item: {name: string, value: any}) => {
        result[item.name] = item.value;
    })
    return result;
}
Array.prototype.remove = function (index, deleteCount = 1) {
    this.splice(index, deleteCount)
}

export default {}