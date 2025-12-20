import { useState, useMemo } from 'react';
import { Space, Table, TableColumnsType, Tag, Button, Popconfirm, message, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTable } from '../../hooks/useTable';
import { TableForm } from '../../components/TableForm';
import type { TableDataItem, CreateTableDataParams, UpdateTableDataParams } from '../../types/table';

export const MyTable = () => {
	const { dataSource, loading, pagination, create, update, remove, batchRemove, setQueryParams } =
		useTable();

	// 表单弹窗状态
	const [formVisible, setFormVisible] = useState(false);
	const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
	const [editingRecord, setEditingRecord] = useState<TableDataItem | undefined>();

	// 选中的行
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	// 打开新增表单
	const handleCreate = () => {
		setFormMode('create');
		setEditingRecord(undefined);
		setFormVisible(true);
	};

	// 打开编辑表单
	const handleEdit = (record: TableDataItem) => {
		setFormMode('edit');
		setEditingRecord(record);
		setFormVisible(true);
	};

	// 删除单条数据
	const handleDelete = async (id: number) => {
		await remove(id);
	};

	// 批量删除
	const handleBatchDelete = async () => {
		if (selectedRowKeys.length === 0) {
			message.warning('请选择要删除的数据');
			return;
		}
		await batchRemove(selectedRowKeys as number[]);
		setSelectedRowKeys([]);
	};

	// 提交表单
	const handleFormSubmit = async (
		values: CreateTableDataParams | UpdateTableDataParams
	): Promise<boolean> => {
		if (formMode === 'create') {
			return await create(values as CreateTableDataParams);
		} else {
			return await update(values as UpdateTableDataParams);
		}
	};

	// 分页变化
	const handleTableChange = (page: number, pageSize: number) => {
		setQueryParams({ page, pageSize });
	};

	// 表格列定义
	const columns: TableColumnsType<TableDataItem> = useMemo(
		() => [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
				width: 80,
			},
			{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
				// 过滤
				filters: [
					{
						text: '胡歌',
						value: '胡歌',
					},
					{
						text: '胡彦祖',
						value: '胡彦祖',
					},
					{
						text: '胡彦秋',
						value: '胡彦秋',
					},
				],
				onFilter: (value, record) => record.name === value,
				// 排序
				sortDirections: ['descend', 'ascend'],
				sorter: (a, b) => a.name.length - b.name.length,
			},
			{
				title: '年龄',
				dataIndex: 'age',
				key: 'age',
				width: 100,
				sorter: (a, b) => a.age - b.age,
			},
			{
				title: '住址',
				dataIndex: 'address',
				key: 'address',
				ellipsis: true,
			},
			{
				title: '标签',
				key: 'tags',
				dataIndex: 'tags',
				render: (_, { tags }) => (
					<>
						{tags.map((tag) => {
							let color = tag.length > 5 ? 'geekblue' : 'green';
							if (tag === 'loser') {
								color = 'volcano';
							}
							return (
								<Tag color={color} key={tag}>
									{tag.toUpperCase()}
								</Tag>
							);
						})}
					</>
				),
			},
			{
				title: '操作',
				key: 'action',
				width: 150,
				fixed: 'right',
				render: (_, record) => (
					<Space size="middle">
						<Button
							type="link"
							icon={<EditOutlined />}
							onClick={() => handleEdit(record)}
						>
							编辑
						</Button>
						<Popconfirm
							title="确定要删除这条数据吗？"
							onConfirm={() => handleDelete(record.id)}
							okText="确定"
							cancelText="取消"
						>
							<Button type="link" danger icon={<DeleteOutlined />}>
								删除
							</Button>
						</Popconfirm>
					</Space>
				),
			},
		],
		[]
	);

	// 行选择配置
	const rowSelection = {
		selectedRowKeys,
		onChange: (keys: React.Key[]) => {
			setSelectedRowKeys(keys);
		},
		getCheckboxProps: (record: TableDataItem) => ({
			disabled: record.name === '胡彦秋', // 示例：某些行不可选
			name: record.name,
		}),
	};

	return (
		<Card>
			<Space direction="vertical" size="middle" style={{ width: '100%' }}>
				{/* 操作栏 */}
				<Space>
					<Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
						新增
					</Button>
					<Popconfirm
						title={`确定要删除选中的 ${selectedRowKeys.length} 条数据吗？`}
						onConfirm={handleBatchDelete}
						disabled={selectedRowKeys.length === 0}
						okText="确定"
						cancelText="取消"
					>
						<Button
							danger
							icon={<DeleteOutlined />}
							disabled={selectedRowKeys.length === 0}
						>
							批量删除 ({selectedRowKeys.length})
						</Button>
					</Popconfirm>
				</Space>

				{/* 表格 */}
				<Table<TableDataItem>
					columns={columns}
					dataSource={dataSource}
					rowKey="id"
					loading={loading}
					rowSelection={rowSelection}
					pagination={{
						current: pagination.current,
						pageSize: pagination.pageSize,
						total: pagination.total,
						showSizeChanger: true,
						showQuickJumper: true,
						showTotal: (total) => `共 ${total} 条`,
						onChange: handleTableChange,
						onShowSizeChange: handleTableChange,
					}}
					scroll={{ x: 1000 }}
				/>

				{/* 表单弹窗 */}
				<TableForm
					open={formVisible}
					mode={formMode}
					initialData={editingRecord}
					onCancel={() => {
						setFormVisible(false);
						setEditingRecord(undefined);
					}}
					onSubmit={handleFormSubmit}
				/>
			</Space>
		</Card>
	);
};
