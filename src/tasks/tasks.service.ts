import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './models/task.model';
import { v4 as uuid } from 'uuid'
import { CreatetaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-filter-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto

        let tasks = this.getAllTasks()
        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        if (search) {
            tasks = tasks.filter((tasks) => {
                if (tasks.title.includes(search) || tasks.description.includes(search)) {
                    return true
                }
                return false
            })
        }

        return tasks
    }

    createTask(createtaskDto: CreatetaskDto): Task {
        const { title, description } = createtaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task
    }

    getTaskById(Id: string): Task {
        return this.tasks.find(task => task.id === Id)
    }

    deleteTask(Id: string): void {
        this.tasks = this.tasks.filter(task => task.id != Id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status
        return task;
    }
}
