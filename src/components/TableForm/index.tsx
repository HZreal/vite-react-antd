/**
 * 表格数据表单组件（新增/编辑）
 */
import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Space, Button } from 'antd';
import type { TableDataItem, CreateTableDataParams, UpdateTableDataParams } from '../../types/table';

const { TextArea } = Input;

interface TableFormProps {
	open: boolean;
	mode: 'create' | 'edit';
	initialData?: TableDataItem;
	onCancel: () => void;
	onSubmit: (values: CreateTableDataParams | UpdateTableDataParams) => Promise<boolean>;
}

const TAG_OPTIONS = ['nice', 'developer', 'loser', 'cool', 'teacher', 'geek'];

export const TableForm = ({ open, mode, initialData, onCancel, onSubmit }: TableFormProps) => {
	const [form] = Form.useForm();

	// 当打开弹窗或初始数据变化时，重置表单
	useEffect(() => {
		if (open) {
			if (mode === 'edit' && initialData) {
				form.setFieldsValue({
					name: initialData.name,
					age: initialData.age,
					address: initialData.address,
					tags: initialData.tags,
				});
			} else {
				form.resetFields();
			}
		}
	}, [open, mode, initialData, form]);

	// 提交表单
	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			const submitData =
				mode === 'edit'
					? ({ ...values, id: initialData!.id } as UpdateTableDataParams)
					: (values as CreateTableDataParams);

			const success = await onSubmit(submitData);
			if (success) {
				form.resetFields();
				onCancel();
			}
		} catch (error) {
			console.error('表单验证失败:', error);
		}
	};

	return (
		<Modal
			title={mode === 'create' ? '新增数据' : '编辑数据'}
			open={open}
			onCancel={onCancel}
			footer={
				<Space>
					<Button onClick={onCancel}>取消</Button>
					<Button type="primary" onClick={handleSubmit}>
						确定
					</Button>
				</Space>
			}
			width={600}
			destroyOnClose
		>
			<Form
				form={form}
				layout="vertical"
				initialValues={{
					tags: [],
				}}
			>
				<Form.Item
					name="name"
					label="姓名"
					rules={[
						{ required: true, message: '请输入姓名' },
						{ min: 2, max: 20, message: '姓名长度在 2-20 个字符之间' },
					]}
				>
					<Input placeholder="请输入姓名" />
				</Form.Item>

				<Form.Item
					name="age"
					label="年龄"
					rules={[
						{ required: true, message: '请输入年龄' },
						{ type: 'number', min: 1, max: 150, message: '年龄必须在 1-150 之间' },
					]}
				>
					<InputNumber placeholder="请输入年龄" style={{ width: '100%' }} min={1} max={150} />
				</Form.Item>

				<Form.Item
					name="address"
					label="住址"
					rules={[
						{ required: true, message: '请输入住址' },
						{ max: 200, message: '住址长度不能超过 200 个字符' },
					]}
				>
					<TextArea rows={3} placeholder="请输入住址" />
				</Form.Item>

				<Form.Item
					name="tags"
					label="标签"
					rules={[{ required: true, message: '请至少选择一个标签' }]}
				>
					<Select
						mode="multiple"
						placeholder="请选择标签"
						style={{ width: '100%' }}
						options={TAG_OPTIONS.map((tag) => ({ label: tag.toUpperCase(), value: tag }))}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

