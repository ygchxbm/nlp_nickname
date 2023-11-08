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
				name: 'home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '首页',
					roles: ['admin'],
					icon: 'menu-dashboard',
				},
			},
			{
				path: '/release-evaluation/index',
				name: 'InitiateEvaluation',
				component: () => import('@/views/InitiateEvaluation/index.vue'),
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
			{
				path: '/response-evaluation/choiceQuestion',
				name: 'choiceQuestion',
				component: () => import('@/views/responseEvaluation/ChoiceQuestion.vue'),
				meta: {
					title: '作答评测-选择题',
					roles: ['admin'],
					icon: 'menu-trend',
				},
			},
			// {
			// 	path: '/x-strategy/index',
			// 	name: 'XStrategy',
			// 	component: () => import('@/views/heatmap/ChoiceQuestion.vue'),
			// 	meta: {
			// 		title: '技术中心策略监控',
			// 		roles: ['admin'],
			// 		icon: 'menu-trend',
			// 	},
			// },
			// {
			// 	path: '/strategy-intersection/index',
			// 	name: 'StrategyIntersection',
			// 	component: () => import('@/views/heatmap/ChoiceQuestion.vue'),
			// 	meta: {
			// 		title: '策略交集',
			// 		roles: ['admin'],
			// 		icon: 'menu-intersection',
			// 	},
			// 	children: [
			// 		{
			// 			path: '/strategy-intersection/rule',
			// 			name: 'StrategyIntersection',
			// 			component: () => import('@/views/heatmap/ChoiceQuestion.vue'),
			// 			meta: {
			// 				title: '上报与安全处罚交集',
			// 			},
			// 		},
			// 	]
			// },
		],

	},
];
