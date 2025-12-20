/**
 * 表格相关的类型定义
 */

// 表格数据项类型
export interface TableDataItem {
	id: number;
	name: string;
	age: number;
	address: string;
	tags: string[];
	createdAt?: string;
	updatedAt?: string;
}

// 创建表格数据请求参数
export interface CreateTableDataParams {
	name: string;
	age: number;
	address: string;
	tags: string[];
}

// 更新表格数据请求参数
export interface UpdateTableDataParams extends Partial<CreateTableDataParams> {
	id: number;
}

// API 响应基础结构
export interface ApiResponse<T = any> {
	code: number;
	message: string;
	data: T;
}

// 分页响应结构
export interface PaginationResponse<T> {
	list: T[];
	total: number;
	page: number;
	pageSize: number;
}

// 分页请求参数
export interface PaginationParams {
	page: number;
	pageSize: number;
}

// 查询参数（可扩展）
export interface QueryParams extends PaginationParams {
	name?: string;
	age?: number;
}

