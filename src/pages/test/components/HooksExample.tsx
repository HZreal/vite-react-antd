import { useState, useEffect, useRef } from 'react';
import { Card, Button, Input, Space, Typography, Divider } from 'antd';
import type { InputRef } from 'antd';

const { Title, Text, Paragraph } = Typography;

/**
 * React Hooks 学习示例
 * 展示 useState, useEffect, useRef 等常用 Hooks
 */
export const HooksExample = () => {
	// 1. useState - 状态管理（类似 Vue 的 ref/reactive）
	const [count, setCount] = useState(0);
	const [name, setName] = useState('');
	const [timer, setTimer] = useState(0);

	// 2. useRef - 获取 DOM 引用或保存可变值（类似 Vue 的 ref）
	const inputRef = useRef<InputRef>(null);

	// 3. useEffect - 副作用处理（类似 Vue 的 watch/onMounted）
	// 组件挂载时执行
	useEffect(() => {
		console.log('组件已挂载');
		return () => {
			console.log('组件即将卸载');
		};
	}, []); // 空数组表示只在挂载和卸载时执行

	// 监听 count 变化
	useEffect(() => {
		console.log(`count 变化为: ${count}`);
	}, [count]); // 依赖数组：当 count 变化时执行

	// 定时器示例
	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);

		// 清理函数：组件卸载或依赖变化时执行
		return () => clearInterval(interval);
	}, []);

	// 聚焦输入框
	const focusInput = () => {
		inputRef.current?.focus();
	};

	return (
		<Card title="React Hooks 示例">
			<Space direction="vertical" size="large" style={{ width: '100%' }}>
				{/* useState 示例 */}
				<div>
					<Title level={4}>1. useState - 状态管理</Title>
					<Paragraph>
						<Text>当前计数: </Text>
						<Text strong style={{ fontSize: '20px', color: '#1890ff' }}>
							{count}
						</Text>
					</Paragraph>
					<Space>
						<Button onClick={() => setCount(count + 1)}>增加</Button>
						<Button onClick={() => setCount(count - 1)}>减少</Button>
						<Button onClick={() => setCount(0)}>重置</Button>
					</Space>
				</div>

				<Divider />

				{/* useRef 示例 */}
				<div>
					<Title level={4}>2. useRef - DOM 引用</Title>
					<Space>
						<Input
							ref={inputRef}
							placeholder="输入你的名字"
							value={name}
							onChange={(e) => setName(e.target.value)}
							style={{ width: 200 }}
						/>
						<Button onClick={focusInput}>聚焦输入框</Button>
					</Space>
					{name && (
						<Paragraph style={{ marginTop: 10 }}>
							<Text>你好, </Text>
							<Text strong>{name}</Text>
						</Paragraph>
					)}
				</div>

				<Divider />

				{/* useEffect 示例 */}
				<div>
					<Title level={4}>3. useEffect - 副作用处理</Title>
					<Paragraph>
						<Text>定时器运行时间: </Text>
						<Text strong style={{ fontSize: '18px' }}>
							{timer} 秒
						</Text>
					</Paragraph>
					<Paragraph type="secondary">
						打开浏览器控制台查看 useEffect 的日志输出
					</Paragraph>
				</div>
			</Space>
		</Card>
	);
};

