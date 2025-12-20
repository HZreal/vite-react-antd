import { useState } from 'react';
import { Card, List, Button, Input, Space, Typography, Tag, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

interface TodoItem {
	id: number;
	text: string;
	completed: boolean;
}

/**
 * 列表渲染示例
 * 展示 React 中的列表渲染（类似 Vue 的 v-for）
 */
export const ListRendering = () => {
	const [todos, setTodos] = useState<TodoItem[]>([
		{ id: 1, text: '学习 React Hooks', completed: false },
		{ id: 2, text: '掌握 Ant Design', completed: true },
		{ id: 3, text: '完成项目练习', completed: false },
	]);
	const [inputValue, setInputValue] = useState('');

	// 添加待办事项
	const addTodo = () => {
		if (inputValue.trim()) {
			const newTodo: TodoItem = {
				id: Date.now(),
				text: inputValue,
				completed: false,
			};
			setTodos([...todos, newTodo]);
			setInputValue('');
		}
	};

	// 切换完成状态
	const toggleTodo = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	// 删除待办事项
	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<Card title="列表渲染示例 - 待办事项">
			<Space direction="vertical" size="middle" style={{ width: '100%' }}>
				{/* 添加待办事项 */}
				<Space.Compact style={{ width: '100%' }}>
					<Input
						placeholder="输入新的待办事项"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onPressEnter={addTodo}
					/>
					<Button type="primary" icon={<PlusOutlined />} onClick={addTodo}>
						添加
					</Button>
				</Space.Compact>

				{/* 统计信息 */}
				<Paragraph>
					总计: {todos.length} | 已完成: {todos.filter((t) => t.completed).length} | 未完成:{' '}
					{todos.filter((t) => !t.completed).length}
				</Paragraph>

				{/* 列表渲染 - 使用 map 方法（类似 v-for） */}
				<List
					dataSource={todos}
					renderItem={(item) => (
						<List.Item
							actions={[
								<Button
									type="link"
									onClick={() => toggleTodo(item.id)}
									key="toggle"
								>
									{item.completed ? '标记未完成' : '标记完成'}
								</Button>,
								<Popconfirm
									title="确定要删除吗？"
									onConfirm={() => deleteTodo(item.id)}
									key="delete"
								>
									<Button type="link" danger icon={<DeleteOutlined />}>
										删除
									</Button>
								</Popconfirm>,
							]}
						>
							<List.Item.Meta
								title={
									<span
										style={{
											textDecoration: item.completed ? 'line-through' : 'none',
											color: item.completed ? '#999' : '#000',
										}}
									>
										{item.text}
									</span>
								}
								description={
									<Tag color={item.completed ? 'success' : 'processing'}>
										{item.completed ? '已完成' : '进行中'}
									</Tag>
								}
							/>
						</List.Item>
					)}
				/>

				{/* 空状态 */}
				{todos.length === 0 && (
					<Paragraph type="secondary" style={{ textAlign: 'center' }}>
						暂无待办事项，添加一个开始吧！
					</Paragraph>
				)}
			</Space>
		</Card>
	);
};

