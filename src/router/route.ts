import { RouteRecordRaw } from 'vue-router';

export const constantRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('@/layout/index.vue'),
		redirect: '/home',
		meta: {
			title: '首页'
		},
		children: [
			{
				path: '/:path(.*)*',
				name: 'notFound',
				component: () => import('@/views/error/404.vue'),
				meta: {
					title: 'message.staticRoutes.notFound',
					isHide: true,
				},
			},
			{
				path: '/401',
				name: 'noPower',
				component: () => import('@/views/error/401.vue'),
				meta: {
					title: 'message.staticRoutes.noPower',
					isHide: true,
				},
			},
			{
				path: '/home',
				name: 'Index',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '首页',
					roles: ['admin'],
					icon: 'menu-dashboard',
				},
			},
			{
				path: '/release-evaluation/index',
				name: 'releaseEvaluation',
				component: () => import('@/views/releaseEvaluation/index.vue'),
				meta: {
					title: '发起评测',
					roles: ['admin'],
					icon: 'menu-trend',
				},
			},
			{
				path: '/preview-evaluation/index',
				name: 'previewEvaluation',
				component: () => import('@/views/previewEvaluation/index.vue'),
				meta: {
					title: '预览评测',
					roles: ['admin'],
					icon: 'menu-trend',
				},
			},
			// {
			// 	path: '/x-strategy/index',
			// 	name: 'XStrategy',
			// 	component: () => import('@/views/heatmap/index.vue'),
			// 	meta: {
			// 		title: '技术中心策略监控',
			// 		roles: ['admin'],
			// 		icon: 'menu-trend',
			// 	},
			// },
			// {
			// 	path: '/strategy-intersection/index',
			// 	name: 'StrategyIntersection',
			// 	component: () => import('@/views/heatmap/index.vue'),
			// 	meta: {
			// 		title: '策略交集',
			// 		roles: ['admin'],
			// 		icon: 'menu-intersection',
			// 	},
			// 	children: [
			// 		{
			// 			path: '/strategy-intersection/rule',
			// 			name: 'StrategyIntersection',
			// 			component: () => import('@/views/heatmap/index.vue'),
			// 			meta: {
			// 				title: '上报与安全处罚交集',
			// 			},
			// 		},
			// 	]
			// },
		],

	},
];
