/**
 * 表格相关的 API 接口
 */
import request from './request';
import { mockTableApi } from './mock';
import type {
	TableDataItem,
	CreateTableDataParams,
	UpdateTableDataParams,
	QueryParams,
	PaginationResponse,
} from '../types/table';

// 是否使用 Mock 数据（可以通过环境变量控制）
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_BASE_URL;

/**
 * 获取表格数据列表（分页）
 */
export const getTableDataList = async (
	params: QueryParams
): Promise<PaginationResponse<TableDataItem>> => {
	if (USE_MOCK) {
		return mockTableApi.getList(params);
	}
	return request.get('/table/list', { params });
};

/**
 * 根据 ID 获取表格数据详情
 */
export const getTableDataById = async (id: number): Promise<TableDataItem> => {
	if (USE_MOCK) {
		return mockTableApi.getById(id);
	}
	return request.get(`/table/${id}`);
};

/**
 * 创建表格数据
 */
export const createTableData = async (
	params: CreateTableDataParams
): Promise<TableDataItem> => {
	if (USE_MOCK) {
		return mockTableApi.create(params);
	}
	return request.post('/table', params);
};

/**
 * 更新表格数据
 */
export const updateTableData = async (
	params: UpdateTableDataParams
): Promise<TableDataItem> => {
	if (USE_MOCK) {
		return mockTableApi.update(params);
	}
	const { id, ...rest } = params;
	return request.put(`/table/${id}`, rest);
};

/**
 * 删除表格数据（单个）
 */
export const deleteTableData = async (id: number): Promise<void> => {
	if (USE_MOCK) {
		return mockTableApi.delete(id);
	}
	return request.delete(`/table/${id}`);
};

/**
 * 批量删除表格数据
 */
export const batchDeleteTableData = async (ids: number[]): Promise<void> => {
	if (USE_MOCK) {
		return mockTableApi.batchDelete(ids);
	}
	return request.delete('/table/batch', { data: { ids } });
};
