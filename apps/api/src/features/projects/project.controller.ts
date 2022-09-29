import {
  CreateProject,
  DeleteProject,
  GetAllProjects,
  GetProject,
  UpdateProject,
} from '@gensymtech-projects/api-interfaces';
import { StatusCodes } from 'http-status-codes';
import ProjectService from './project.service';

export default class ProjectController {
  static create: CreateProject = async (req) => {
    const { projectDto } = req.body;

    const project = await ProjectService.create(projectDto);

    return {
      status: StatusCodes.CREATED,
      message: 'Project created successfully',
      data: project,
    };
  };

  static findAll: GetAllProjects = async () => {
    const projects = await ProjectService.findAll();

    return {
      status: StatusCodes.OK,
      message: 'Projects retrieved successfully',
      data: projects,
    };
  };

  static findOne: GetProject = async (req) => {
    const { id } = req.params;

    const project = await ProjectService.findOne(id);

    return {
      status: StatusCodes.OK,
      message: 'Project retrieved successfully',
      data: project,
    };
  };

  static update: UpdateProject = async (req) => {
    const { id } = req.params;
    const { projectDto } = req.body;

    const project = await ProjectService.update(id, projectDto);

    return {
      status: StatusCodes.OK,
      message: 'Project updated successfully',
      data: project,
    };
  };

  static delete: DeleteProject = async (req) => {
    const { id } = req.params;

    const project = await ProjectService.delete(id);

    return {
      status: StatusCodes.OK,
      message: 'Project deleted successfully',
      data: project,
    };
  };
}
