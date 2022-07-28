import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreatetaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-filter-task.dto';
import { Task, TaskStatus } from './models/task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        //if we have any filter defined call task service get task filters 
        // Other wise just get all task 
        if (Object.keys(filterDto).length) {
            return this.taskService.getTaskWithFilters(filterDto);
        } else {
            return this.taskService.getAllTasks()
        }
    }

    @Post('/create')
    createTask(@Body() createtaskDto: CreatetaskDto): Task {
        return this.taskService.createTask(createtaskDto)
    }

    @Get('/taskById/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id)
    }


    @Delete('/taskById/:id')
    deleteTaskById(@Param('id') id: string): void {
        return this.taskService.deleteTask(id)
    }

    @Patch('/taskById/:id/status')
    patchDataById(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this.taskService.updateTaskStatus(id, status)
    }
}
