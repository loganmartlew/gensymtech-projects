import {
  ProjectDTO,
  ProjectMoveDTO,
} from '@gensymtech-projects/api-interfaces';
import { ApiError } from '@gensymtech-projects/errors';
import Project from './project.entity';

export default class ProjectService {
  static async create(projectDto: ProjectDTO): Promise<Project> {
    const newProject = await Project.create();

    if (!newProject) throw new ApiError(null, 3004, 'Unable to create project');

    newProject.name = projectDto.name;
    newProject.description = projectDto.description;
    newProject.status = projectDto.status;
    newProject.dependencies = await Promise.all(
      projectDto.dependencies.map((id) => this.findOne(id))
    );

    try {
      const event = await newProject.save();
      return event;
    } catch (error) {
      throw new ApiError(error, 3003, 'Unable to save project');
    }
  }

  static async findAll(): Promise<Project[]> {
    const projects = await Project.find({
      relations: ['dependencies'],
    });
    return projects;
  }

  static async findOne(id: string): Promise<Project> {
    const project = await Project.findOne({
      where: { id },
      relations: ['dependencies'],
    });

    if (!project) {
      throw new ApiError(null, 3002, 'Event not found');
    }

    return project;
  }

  static async update(
    id: string,
    projectDto: ProjectDTO,
    order?: number
  ): Promise<Project> {
    const project = await this.findOne(id);

    project.name = projectDto.name;
    project.description = projectDto.description;
    project.status = projectDto.status;
    project.dependencies = await Promise.all(
      projectDto.dependencies.map((id) => this.findOne(id))
    );

    if (order != null) project.order = order;

    try {
      const event = await project.save();
      return event;
    } catch (error) {
      throw new ApiError(error, 3006, 'Unable to update project');
    }
  }

  static async delete(id: string): Promise<Project> {
    const project = await this.findOne(id);

    try {
      const event = await project.remove();
      return event;
    } catch (error) {
      throw new ApiError(error, 3005, 'Unable to delete project');
    }
  }

  static async move(dtos: ProjectMoveDTO[]): Promise<Project[]> {
    const projects = await Promise.all(
      dtos.map((dto) => this.update(dto.id, dto, dto.order))
    );

    return projects;
  }
}
