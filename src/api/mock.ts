/**
 * Mock 数据服务
 * 用于开发阶段模拟后端 API
 * 生产环境可以删除此文件或通过环境变量控制
 */
import type {
	TableDataItem,
	CreateTableDataParams,
	UpdateTableDataParams,
	PaginationResponse,
	QueryParams,
} from '../types/table';

// 模拟数据存储（实际项目中应该从后端获取）
let mockData: TableDataItem[] = [
	{
		id: 1,
		name: '胡歌',
		age: 32,
		address: '西湖区湖底公园1号',
		tags: ['nice', 'developer'],
		createdAt: '2024-01-01',
		updatedAt: '2024-01-01',
	},
	{
		id: 2,
		name: '胡彦祖',
		age: 42,
		address: '西湖区湖底公园2号',
		tags: ['loser'],
		createdAt: '2024-01-02',
		updatedAt: '2024-01-02',
	},
	{
		id: 3,
		name: '胡彦秋',
		age: 32,
		address: '西湖区湖底公园3号',
		tags: ['cool', 'teacher'],
		createdAt: '2024-01-03',
		updatedAt: '2024-01-03',
	},
];

// 模拟网络延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API 实现
export const mockTableApi = {
	// 获取列表
	getList: async (params: QueryParams): Promise<PaginationResponse<TableDataItem>> => {
		await delay(500); // 模拟网络延迟

		let filteredData = [...mockData];

		// 模拟筛选
		if (params.name) {
			filteredData = filteredData.filter((item) => item.name.includes(params.name!));
		}
		if (params.age) {
			filteredData = filteredData.filter((item) => item.age === params.age);
		}

		// 模拟分页
		const { page = 1, pageSize = 10 } = params;
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const list = filteredData.slice(start, end);

		return {
			list,
			total: filteredData.length,
			page,
			pageSize,
		};
	},

	// 获取详情
	getById: async (id: number): Promise<TableDataItem> => {
		await delay(300);
		const item = mockData.find((item) => item.id === id);
		if (!item) {
			throw new Error('数据不存在');
		}
		return item;
	},

	// 创建
	create: async (params: CreateTableDataParams): Promise<TableDataItem> => {
		await delay(500);
		const newItem: TableDataItem = {
			id: Math.max(...mockData.map((item) => item.id), 0) + 1,
			...params,
			createdAt: new Date().toISOString().split('T')[0],
			updatedAt: new Date().toISOString().split('T')[0],
		};
		mockData.push(newItem);
		return newItem;
	},

	// 更新
	update: async (params: UpdateTableDataParams): Promise<TableDataItem> => {
		await delay(500);
		const index = mockData.findIndex((item) => item.id === params.id);
		if (index === -1) {
			throw new Error('数据不存在');
		}
		mockData[index] = {
			...mockData[index],
			...params,
			updatedAt: new Date().toISOString().split('T')[0],
		};
		return mockData[index];
	},

	// 删除
	delete: async (id: number): Promise<void> => {
		await delay(300);
		const index = mockData.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new Error('数据不存在');
		}
		mockData.splice(index, 1);
	},

	// 批量删除
	batchDelete: async (ids: number[]): Promise<void> => {
		await delay(500);
		mockData = mockData.filter((item) => !ids.includes(item.id));
	},
};

