import { Tabs, TabsProps } from 'antd';
import { HooksExample } from './components/HooksExample';
import { ConditionalRendering } from './components/ConditionalRendering';
import { ListRendering } from './components/ListRendering';
import { EventHandling } from './components/EventHandling';

/**
 * React 学习示例集合
 * 包含 Hooks、条件渲染、列表渲染、事件处理等核心概念
 */
export const Test = () => {
	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Hooks 示例',
			children: <HooksExample />,
		},
		{
			key: '2',
			label: '条件渲染',
			children: <ConditionalRendering />,
		},
		{
			key: '3',
			label: '列表渲染',
			children: <ListRendering />,
		},
		{
			key: '4',
			label: '事件处理',
			children: <EventHandling />,
		},
	];

	return (
		<div style={{ padding: '20px' }}>
			<Tabs defaultActiveKey="1" items={items} />
		</div>
	);
};

