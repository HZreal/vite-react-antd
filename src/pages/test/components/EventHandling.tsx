import { useState } from 'react';
import { Card, Button, Input, Space, Typography, message, Divider } from 'antd';

const { Title, Paragraph } = Typography;

/**
 * 事件处理示例
 * 展示 React 中的事件处理方式（类似 Vue 的 @click, @input）
 */
export const EventHandling = () => {
	const [text, setText] = useState('');
	const [count, setCount] = useState(0);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	// 基本事件处理
	const handleClick = () => {
		message.success('按钮被点击了！');
	};

	// 带参数的事件处理
	const handleButtonClick = (buttonName: string) => {
		message.info(`你点击了 ${buttonName} 按钮`);
	};

	// 输入事件处理
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	// 鼠标移动事件
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		setMousePosition({ x: e.clientX, y: e.clientY });
	};

	// 阻止默认行为
	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		message.success(`表单提交: ${text}`);
	};

	return (
		<Card title="事件处理示例">
			<Space direction="vertical" size="large" style={{ width: '100%' }}>
				{/* 基本点击事件 */}
				<div>
					<Title level={4}>1. 基本事件处理</Title>
					<Space>
						<Button type="primary" onClick={handleClick}>
							点击我
						</Button>
						<Button onClick={() => handleButtonClick('按钮A')}>按钮A</Button>
						<Button onClick={() => handleButtonClick('按钮B')}>按钮B</Button>
					</Space>
				</div>

				<Divider />

				{/* 输入事件 */}
				<div>
					<Title level={4}>2. 输入事件处理</Title>
					<Input
						placeholder="输入内容，实时显示"
						value={text}
						onChange={handleInputChange}
						style={{ width: 300 }}
					/>
					{text && (
						<Paragraph style={{ marginTop: 10 }}>
							当前输入: <strong>{text}</strong>
						</Paragraph>
					)}
				</div>

				<Divider />

				{/* 表单提交 */}
				<div>
					<Title level={4}>3. 表单提交（阻止默认行为）</Title>
					<form onSubmit={handleFormSubmit}>
						<Space>
							<Input
								placeholder="输入后按回车提交"
								value={text}
								onChange={handleInputChange}
								style={{ width: 200 }}
							/>
							<Button type="primary" htmlType="submit">
								提交
							</Button>
						</Space>
					</form>
				</div>

				<Divider />

				{/* 鼠标事件 */}
				<div>
					<Title level={4}>4. 鼠标移动事件</Title>
					<div
						onMouseMove={handleMouseMove}
						style={{
							padding: '20px',
							background: '#f0f0f0',
							borderRadius: '8px',
							cursor: 'crosshair',
						}}
					>
						<Paragraph>在此区域移动鼠标</Paragraph>
						<Paragraph>
							鼠标位置: X = {mousePosition.x}, Y = {mousePosition.y}
						</Paragraph>
					</div>
				</div>

				<Divider />

				{/* 状态更新 */}
				<div>
					<Title level={4}>5. 状态更新事件</Title>
					<Space>
						<Button onClick={() => setCount(count + 1)}>增加</Button>
						<Button onClick={() => setCount(count - 1)}>减少</Button>
						<Button onClick={() => setCount(0)}>重置</Button>
					</Space>
					<Paragraph style={{ marginTop: 10 }}>
						当前计数: <strong style={{ fontSize: '20px' }}>{count}</strong>
					</Paragraph>
				</div>
			</Space>
		</Card>
	);
};

