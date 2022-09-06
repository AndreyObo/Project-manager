export class HashTable {
    constructor() {
        this.num =0
        this.table=[]
        console.log("n table")
    }

    Clear() {
        this.table=[]
    }

    Add(id, value) {
        if(this.table.length ===0) {
            this.table.push({id, value})
            return;
        }

        let IsExist = false

        for(let i=0; i<this.table.length; i++) {
            if(id === this.table[i].id) {
                IsExist = true
            }
        }

        if(IsExist) {
            return
        }
        else {
            this.table.push({id, value})
        }
        
    }

    Get() {
        return this.table
    }

    GetValue(v_id) {
        for(let i=0; i<this.table.length; i++) {
            if(v_id === this.table[i].id) {
                return this.table[i].value
            }
        }
    }

    GetId(val) {
        for(let i=0; i<this.table.length; i++) {
            if(this.table[i].value === val) {
                return this.table[i].id
            }
        }
    }
}