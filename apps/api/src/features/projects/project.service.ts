import { IProject, ProjectDTO } from '@gensymtech-projects/api-interfaces';
import Project from './project.entity';

export default class ProjectService {
  static async create(projectDto: ProjectDTO): Promise<IProject> {
    const newProject = await Project.create();

    newProject.name = projectDto.name;
    newProject.description = projectDto.description;
    newProject.status = projectDto.status;
    newProject.dependencies = await Project.findByIds(projectDto.dependencies);

    await newProject.save();

    return newProject;
  }

  static async findAll(): Promise<IProject[]> {
    const projects = await Project.find({
      relations: ['dependencies'],
    });
    return projects;
  }

  static async findOne(id: string): Promise<IProject> {
    const project = await Project.findOne({
      where: { id },
      relations: ['dependencies'],
    });
    return project;
  }
}
