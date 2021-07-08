let Task = function( _taskName, _status) {
    this.id = Math.random();
    this.taskName = _taskName;
    this.status = _status;
};