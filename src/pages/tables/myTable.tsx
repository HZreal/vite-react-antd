import {Space, Table, TableColumnsType, Tag} from "antd";
import React from "react";


interface DataType {
	key: React.Key;
	name: string;
	age: number;
	address: string;
	tags: string[];
}

const columns: TableColumnsType<DataType> = [
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
			}
		],
		onFilter: (value, record) => record.name === value,
		// 排序
		// 排序方式
		sortDirections: ['descend', 'ascend'],
		// 排序触发的事件
		sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: '年龄',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: '住址',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: '标签',
		key: 'tags',
		dataIndex: 'tags',
		render: (_, {tags}) => (
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
		render: (_, record) => (
			<Space size="middle">
				<a>Invite {record.name}</a>
				<a>Delete</a>
			</Space>
		),
	},
];

const dataSource: DataType[] = [
	{
		key: '1',
		name: '胡歌',
		age: 32,
		address: '西湖区湖底公园1号',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		name: '胡彦祖',
		age: 42,
		address: '西湖区湖底公园2号',
		tags: ['loser'],
	},
	{
		key: '3',
		name: '胡彦秋',
		age: 32,
		address: '西湖区湖底公园3号',
		tags: ['cool', 'teacher'],
	}
];

export const MyTable = () => {
	return (
		<>
			<Table
				columns={columns}
				dataSource={dataSource}
				rowSelection={{
					type: 'checkbox',
					onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
						console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
					},
					getCheckboxProps: (record) => ({
						disabled: record.name === '胡彦秋', // Column configuration not to be checked
						name: record.name,
					}),
					selections: [
						Table.SELECTION_ALL,
						Table.SELECTION_INVERT,
						Table.SELECTION_NONE
					],
				}}

			/>
		</>
	)
}
