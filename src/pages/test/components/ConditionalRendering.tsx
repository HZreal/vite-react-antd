import { useState } from 'react';
import { Card, Button, Switch, Space, Typography, Tag, Divider } from 'antd';

const { Title, Paragraph } = Typography;

/**
 * 条件渲染示例
 * 展示 React 中的条件渲染方式（类似 Vue 的 v-if, v-show）
 */
export const ConditionalRendering = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userRole, setUserRole] = useState<'admin' | 'user' | 'guest'>('guest');
	const [showDetails, setShowDetails] = useState(true);

	return (
		<Card title="条件渲染示例">
			<Space direction="vertical" size="large" style={{ width: '100%' }}>
				{/* 方式1: 三元运算符（类似 v-if） */}
				<div>
					<Title level={4}>1. 三元运算符</Title>
					<Space>
						<Switch
							checked={isLoggedIn}
							onChange={setIsLoggedIn}
							checkedChildren="已登录"
							unCheckedChildren="未登录"
						/>
						{isLoggedIn ? (
							<Tag color="success">欢迎回来！</Tag>
						) : (
							<Tag color="default">请先登录</Tag>
						)}
					</Space>
				</div>

				<Divider />

				{/* 方式2: && 运算符（类似 v-if，但不渲染 false） */}
				<div>
					<Title level={4}>2. && 运算符</Title>
					<Space>
						<Button onClick={() => setShowDetails(!showDetails)}>
							{showDetails ? '隐藏' : '显示'}详情
						</Button>
						{showDetails && (
							<Paragraph>
								这是通过 && 运算符条件渲染的内容，当 showDetails 为 true 时显示
							</Paragraph>
						)}
					</Space>
				</div>

				<Divider />

				{/* 方式3: 函数返回不同内容 */}
				<div>
					<Title level={4}>3. 函数条件渲染</Title>
					<Space>
						<Button onClick={() => setUserRole('admin')}>管理员</Button>
						<Button onClick={() => setUserRole('user')}>普通用户</Button>
						<Button onClick={() => setUserRole('guest')}>游客</Button>
					</Space>
					<div style={{ marginTop: 10 }}>
						{(() => {
							switch (userRole) {
								case 'admin':
									return (
										<>
											<Tag color="red">管理员权限</Tag>
											<Paragraph>你可以访问所有功能</Paragraph>
										</>
									);
								case 'user':
									return (
										<>
											<Tag color="blue">普通用户</Tag>
											<Paragraph>你可以访问基础功能</Paragraph>
										</>
									);
								default:
									return (
										<>
											<Tag color="default">游客</Tag>
											<Paragraph>请登录以访问更多功能</Paragraph>
										</>
									);
							}
						})()}
					</div>
				</div>

				<Divider />

				{/* 方式4: 早期返回（在组件中） */}
				<div>
					<Title level={4}>4. 早期返回模式</Title>
					{!isLoggedIn ? (
						<Paragraph type="warning">
							此内容需要登录后才能查看（早期返回示例）
						</Paragraph>
					) : (
						<Paragraph>你已经登录，可以查看此内容</Paragraph>
					)}
				</div>
			</Space>
		</Card>
	);
};

