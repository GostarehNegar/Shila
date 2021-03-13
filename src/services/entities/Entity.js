class Entity{
 
    data ={};
    constructor(data){

        this.data = data || {};

    }
    get payload(){
        return this.data.payload || {}
    }
    toString(){
        return JSON.stringify(this.payload)
    }
}

export default Entity