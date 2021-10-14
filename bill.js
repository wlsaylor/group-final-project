//Initialize row and task counter
let rowId = 0;
let taskId = 0;

//Purpose: Creates a new task from the task form elements
function onCreateTask() {
    //Initialize Table
    const table = document.querySelector('#task-list');
    const row = table.insertRow(rowId + 1);

    //Create all other elements in the row
    row.setAttribute('id', `task-${rowId}`);

    const taskValue = document.querySelector('#task').value;
    let taskCell = row.insertCell(0);
    taskCell.innerHTML = taskValue;
    taskCell.setAttribute('id', `task-name-${rowId}`);

    const materialValue = document.querySelector('#materials').value;
    let materialsCell = row.insertCell(1);
    materialsCell.innerHTML = materialValue;
    materialsCell.setAttribute('id', `materials-${rowId}`);

    const dueDateValue = document.querySelector('#due-date').value;
    let dueDateCell = row.insertCell(2);
    dueDateCell.innerHTML = dueDateValue;
    dueDateCell.setAttribute('id', `due-date-${rowId}`);

    const actions = row.insertCell(3);
    
    //Pass both IDs into buttons. One for deleting the target row and one for deleting the target object
    actions.appendChild(createEditButton(rowId, taskId));
    actions.appendChild(createDeleteButton(rowId, taskId));

    button = document.querySelector('#new-task');
    if(button.innerHTML = 'Update Task') {
        button.removeAttribute('class');
        button.setAttribute('class', 'btn btn-primary mt-3');
        button.innerHTML = 'Create Task';
    }

    //Update array with complete task info
    taskArray[2].push({taskId, taskValue, materialValue, dueDateValue});

    //Increment counters and return form to original state
    taskId++;
    rowId++;
    resetForm();
}

//Purpose: Handles creation and functionality of the Delete button
function createDeleteButton(deleteId, taskId) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-danger m-1';
    btn.id = deleteId;
    btn.innerHTML = 'Delete';

    btn.onclick = () => {
        const elementToDelete = document.querySelector(`#task-${deleteId}`);
        elementToDelete.parentNode.removeChild(elementToDelete);
        
        //Remove element from array by filtering in place.
        taskArray[2] = taskArray[2].filter(obj => obj.taskId != taskId);
        rowId--;
    }
    return btn;
}

//Purpose: Handles creation and functionality of the Edit button
function createEditButton(editId, taskId) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-warning m-1';
    btn.id = editId;
    btn.innerHTML = 'Edit';

    btn.onclick= () => {
        const elementToEdit = document.querySelector(`#task-${editId}`);

        //Populate form with values from current row
        document.querySelector('#task').value = document.querySelector(`#task-name-${editId}`).innerHTML;
        document.querySelector('#materials').value = document.querySelector(`#materials-${editId}`).innerHTML;
        document.querySelector('#due-date').value = document.querySelector(`#due-date-${editId}`).innerHTML;

        //Change create button to update button
        let updateButton = document.querySelector('#new-task');
        updateButton.removeAttribute('class');
        updateButton.setAttribute('class', 'btn btn-warning mt-3');
        updateButton.innerHTML = 'Update Task';

        elementToEdit.parentNode.removeChild(elementToEdit);

        //Remove element from array by filtering in place.
        taskArray[2] = taskArray[2].filter(obj => obj.taskId != taskId);
        rowId--;    
    }

    return btn;
}

//Return form to its original state
function resetForm() {
    document.querySelector('#task').value = '';
    document.querySelector('#materials').selectedIndex = 0;
    document.querySelector('#due-date').selectedIndex = 0;
}
