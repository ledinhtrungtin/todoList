
var listTask = new TaskList();
var validator = new Validator();

var getEle = function (id) {
    return document.getElementById(id);
};

var renderList = function (list) {
    let todo = ''
    let complete = ''

    list.forEach(function (task) {
        /**
         * nv: đại diện cho 1 phần từ trong mảng (object nhân viên)
         * index: số chỉ mục của phần trong mảng
         */
        // ``: string template
        if (task.status == 'todo') {
            todo += `
                <li>
                    <span>${task.taskName}</span>
                    <div class="buttons">
                        <button class="remove" onclick="deleteToDo(${task.id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" onclick="changeStatus(${task.id})">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `
        } else {
            complete += `
                <li>
                    <span>${task.taskName}</span>
                    <div class="buttons">
                        <button class="remove" onclick="deleteToDo(${task.id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" onclick="changeStatus(${task.id})">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `
        }
        
    });
    getEle('todo').innerHTML = todo;
    getEle('completed').innerHTML = complete;
};

let deleteToDo = function(id){
    listTask.deleteTask(id);
    setLocalStorage();
    renderList(listTask.arr);
}

let changeStatus = function(id){
    listTask.updateTask(id);
    setLocalStorage();
    renderList(listTask.arr);
};

getLocalStorage();

getEle('addItem').addEventListener('click', function () {
    /**
     * Lấy thông tin từ người dùng nhập
     */
    let name = getEle('newTask').value;


    // /**
    //  * Kiểm tra dữ liệu
    //  */

    let list = listTask.arr.map((task)=>{
        return task.taskName;
    })
    let validateInput = true;
    validateInput &= validator.checkeEmpty(name, "empty");
    validateInput &= validator.checkDup(list, name, "dup");
    if(validateInput == false) return;

    /**
     * Khởi tạo đối tượng nhanVien từ lớp đối tượng NhanVien
     */
    var task = new Task(name, "todo");

    /**
     * Thêm đối tượng nhanVien vào mảng
     */
    listTask.addTask(task);


    /**
     * Render danh sách nhân viên ra giao diện
     */
    renderList(listTask.arr);
    /**
     * Lưu data xuống local storage
     */
    setLocalStorage();
});

function getLocalStorage() {
    /**
     * Lấy data từ local storage
     */
    if (localStorage.getItem('list')) {
        listTask.arr = JSON.parse(localStorage.getItem('list'));
        renderList(listTask.arr);
    }
}

function setLocalStorage() {
    /**
     * Lưu data xuống local storage, chuyển thành định dạng JSON
     */
    localStorage.setItem('list', JSON.stringify(listTask.arr));
}
