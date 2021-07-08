function TaskList() {
    this.arr = [];
}

TaskList.prototype.addTask = function (task) {
    this.arr.push(task);
};

TaskList.prototype._findIndex = function (id) {
    return this.arr.findIndex(function (task) {
        return id === task.id;
    });
};

TaskList.prototype.deleteTask = function (id) {
    var viTri = this._findIndex(id);
    if (viTri !== -1) {
        this.arr.splice(viTri, 1);
    }
};

TaskList.prototype.getTaskById = function (id) {
    var viTri = this._findIndex(id);
    if (viTri !== -1) return this.arr[viTri];
};

TaskList.prototype.updateTask = function (id) {
    let task = this.getTaskById(id)
    let viTri = this._findIndex(id);
    if(task.status == 'todo'){
        this.arr[viTri].status = "complete";
    }else{
        this.arr[viTri].status = "todo";
    }

};