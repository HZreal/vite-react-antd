/**
 * 表格数据管理的自定义 Hook
 * 封装了 CRUD 操作和状态管理
 */
import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import {
	getTableDataList,
	createTableData,
	updateTableData,
	deleteTableData,
	batchDeleteTableData,
} from '../api/table';
import type {
	TableDataItem,
	CreateTableDataParams,
	UpdateTableDataParams,
	QueryParams,
} from '../types/table';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../utils/constants';

interface UseTableOptions {
	pageSize?: number;
	autoLoad?: boolean; // 是否自动加载数据
}

interface UseTableReturn {
	// 数据
	dataSource: TableDataItem[];
	loading: boolean;
	pagination: {
		current: number;
		pageSize: number;
		total: number;
	};

	// 方法
	refresh: () => Promise<void>;
	create: (params: CreateTableDataParams) => Promise<boolean>;
	update: (params: UpdateTableDataParams) => Promise<boolean>;
	remove: (id: number) => Promise<boolean>;
	batchRemove: (ids: number[]) => Promise<boolean>;
	setQueryParams: (params: Partial<QueryParams>) => void;
}

export const useTable = (options: UseTableOptions = {}): UseTableReturn => {
	const { pageSize = DEFAULT_PAGE_SIZE, autoLoad = true } = options;

	// 状态管理
	const [dataSource, setDataSource] = useState<TableDataItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		current: DEFAULT_PAGE,
		pageSize,
		total: 0,
	});
	const [queryParams, setQueryParamsState] = useState<QueryParams>({
		page: DEFAULT_PAGE,
		pageSize,
	});

	// 加载数据
	const loadData = useCallback(async () => {
		setLoading(true);
		try {
			const response = await getTableDataList(queryParams);
			setDataSource(response.list || []);
			setPagination({
				current: response.page || queryParams.page,
				pageSize: response.pageSize || queryParams.pageSize,
				total: response.total || 0,
			});
		} catch (error) {
			console.error('加载数据失败:', error);
			message.error('加载数据失败');
		} finally {
			setLoading(false);
		}
	}, [queryParams]);

	// 刷新数据
	const refresh = useCallback(async () => {
		await loadData();
	}, [loadData]);

	// 创建数据
	const create = useCallback(
		async (params: CreateTableDataParams): Promise<boolean> => {
			try {
				await createTableData(params);
				message.success('创建成功');
				await refresh();
				return true;
			} catch (error) {
				console.error('创建失败:', error);
				return false;
			}
		},
		[refresh]
	);

	// 更新数据
	const update = useCallback(
		async (params: UpdateTableDataParams): Promise<boolean> => {
			try {
				await updateTableData(params);
				message.success('更新成功');
				await refresh();
				return true;
			} catch (error) {
				console.error('更新失败:', error);
				return false;
			}
		},
		[refresh]
	);

	// 删除数据
	const remove = useCallback(
		async (id: number): Promise<boolean> => {
			try {
				await deleteTableData(id);
				message.success('删除成功');
				await refresh();
				return true;
			} catch (error) {
				console.error('删除失败:', error);
				return false;
			}
		},
		[refresh]
	);

	// 批量删除
	const batchRemove = useCallback(
		async (ids: number[]): Promise<boolean> => {
			if (ids.length === 0) {
				message.warning('请选择要删除的数据');
				return false;
			}
			try {
				await batchDeleteTableData(ids);
				message.success(`成功删除 ${ids.length} 条数据`);
				await refresh();
				return true;
			} catch (error) {
				console.error('批量删除失败:', error);
				return false;
			}
		},
		[refresh]
	);

	// 设置查询参数
	const setQueryParams = useCallback((params: Partial<QueryParams>) => {
		setQueryParamsState((prev) => ({
			...prev,
			...params,
		}));
	}, []);

	// 自动加载数据
	useEffect(() => {
		if (autoLoad) {
			loadData();
		}
	}, [loadData, autoLoad]);

	return {
		dataSource,
		loading,
		pagination,
		refresh,
		create,
		update,
		remove,
		batchRemove,
		setQueryParams,
	};
};

