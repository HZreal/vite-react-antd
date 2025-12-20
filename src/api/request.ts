/**
 * HTTP 请求封装
 * 基于 axios 的统一请求处理
 */
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { message } from 'antd';
import { API_BASE_URL, REQUEST_TIMEOUT } from '../utils/constants';
import type { ApiResponse } from '../types/table';

// 创建 axios 实例
const request: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: REQUEST_TIMEOUT,
	headers: {
		'Content-Type': 'application/json',
	},
});

// 请求拦截器
request.interceptors.request.use(
	(config) => {
		// 可以在这里添加 token 等认证信息
		// const token = localStorage.getItem('token');
		// if (token) {
		//   config.headers.Authorization = `Bearer ${token}`;
		// }
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
request.interceptors.response.use(
	(response: AxiosResponse<ApiResponse>) => {
		const { data } = response;
		
		// 根据后端返回的数据结构处理
		// 如果后端统一返回 { code, message, data } 结构
		if (data.code !== undefined) {
			if (data.code === 200 || data.code === 0) {
				return data.data; // 直接返回 data 字段
			} else {
				message.error(data.message || '请求失败');
				return Promise.reject(new Error(data.message || '请求失败'));
			}
		}
		
		// 如果后端直接返回数据
		return data;
	},
	(error: AxiosError) => {
		// 处理 HTTP 错误
		if (error.response) {
			const { status, data } = error.response;
			switch (status) {
				case 401:
					message.error('未授权，请重新登录');
					// 可以在这里处理登录跳转
					break;
				case 403:
					message.error('拒绝访问');
					break;
				case 404:
					message.error('请求的资源不存在');
					break;
				case 500:
					message.error('服务器错误');
					break;
				default:
					message.error((data as any)?.message || `请求失败: ${status}`);
			}
		} else if (error.request) {
			message.error('网络错误，请检查网络连接');
		} else {
			message.error('请求配置错误');
		}
		return Promise.reject(error);
	}
);

// 导出封装的请求方法
export default request;

