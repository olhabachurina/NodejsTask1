import * as readline from 'readline';
//�������� ��� Task 
type Task = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
};
// �������� ������ tasks ��� �������� ������ �����
let tasks: Task[] = [];
let taskIdCounter = 0;
//��������� ��� �����/������
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//������� ��� ���������� ������
const addTask = (title: string, description: string): void => {
    const newTask: Task = {
        id: ++taskIdCounter,
        title,
        description,
        completed: false,
    };
    tasks.push(newTask);
    console.log(`Task "${title}" added with ID: ${newTask.id}`);
};
//������� ��� �������� ������
const removeTask = (id: number): void => {
    tasks = tasks.filter(task => task.id !== id);
    console.log(`Task with ID: ${id} removed.`);
};
//������� ��� ������� ������ ��� �����������
const markTaskAsCompleted = (id: number): void => {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = true;
        console.log(`Task with ID: ${id} marked as completed.`);
    } else {
        console.log(`Task with ID: ${id} not found.`);
    }
};
//������� ��� ����������� �����
const listTasks = (): void => {
    console.log("All tasks:");
    tasks.forEach(task => {
        console.log(`${task.id}: ${task.title} [${task.completed ? "Completed" : "Pending"}]`);
    });
};
//������� ��� ������ ����������� �����
const listCompletedTasks = (): void => {
    console.log("Completed tasks:");
    tasks.filter(task => task.completed).forEach(task => {
        console.log(`${task.id}: ${task.title}`);
    });
};
//������� ��� ������ ������������� �����
const listPendingTasks = (): void => {
    console.log("Pending tasks:");
    tasks.filter(task => !task.completed).forEach(task => {
        console.log(`${task.id}: ${task.title}`);
    });
};
//����������� ����
const showMenu = (): void => {
    console.log("\nMenu:");
    console.log("1. Add a task");
    console.log("2. Remove a task");
    console.log("3. Mark a task as completed");
    console.log("4. Show all tasks");
    console.log("5. Show completed tasks");
    console.log("6. Show pending tasks");
    console.log("7. Exit");
};
//��������� ����� ������������
const handleUserInput = (): void => {
    rl.question('Choose an action (1-7): ', (choice) => {
        switch (choice.trim()) {
            case '1':
                rl.question('Enter task title: ', (title) => {
                    rl.question('Enter task description: ', (description) => {
                        addTask(title, description);
                        handleUserInput();  // ������� � ����
                    });
                });
                break;
            case '2':
                rl.question('Enter task ID to remove: ', (id) => {
                    removeTask(parseInt(id, 10));
                    handleUserInput();  // Return to the menu
                });
                break;
            case '3':
                rl.question('Enter task ID to mark as completed: ', (id) => {
                    markTaskAsCompleted(parseInt(id, 10));
                    handleUserInput();  // ������� � ����
                });
                break;
            case '4':
                listTasks();
                handleUserInput();  // ������� � ����
                break;
            case '5':
                listCompletedTasks();
                handleUserInput();  // ������� � ����
                break;
            case '6':
                listPendingTasks();
                handleUserInput();  // ������� � ����
                break;
            case '7':
                console.log('Exiting the program.');
                rl.close();  
                break;
            default:
                console.log('Invalid choice, please try again.');
                handleUserInput();  
                break;
        }
    });
};

console.log("Welcome to the task manager!");
showMenu();
handleUserInput();