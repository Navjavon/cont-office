import {DEPARTMENTS} from '@/store/api-constants';
import http from '@/utils/http';
import {emitMessage} from '@/services/event-bus';

class DepartmentService {
  private departments: IDepartment[] = [];

  async items(update = false): Promise<IDepartment[]> {
    const {departments} = this;
    if (!departments.length || update) {
      await this.getAll();
    }

    return this.departments;
  }

  async getActiveItems(): Promise<IDepartment[]> {
    const items = await this.items(true);
    return items.filter((item) => item.isActive);
  }

  async getAll() {
    try {
      const {data} = await http.get<IDepartment[]>(DEPARTMENTS);
      this.departments = data;
    } catch (e) {
      console.log('Error while getting departments', e)
    }
  }

  @emitMessage()
  addNewDepartment(departmentData: IDepartment): Promise<boolean> {
    return http.post(DEPARTMENTS, departmentData);
  }

  @emitMessage()
  updateDepartment(id: number, data: IDepartment): Promise<boolean> {
    return http.put(`${DEPARTMENTS}/${id}`, data);
  }

  @emitMessage()
  deleteDepartment(id: number): Promise<boolean> {
    return http.delete(`${DEPARTMENTS}/${id}`);
  }
}

export default new DepartmentService();
