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
				path: '/preview-evaluation/previewChoiceQuestion',
				name: 'previewChoiceQuestions',
				component: () => import('@/views/previewEvaluation/PreviewChoiceQuestion.vue'),
				meta: {
					title: '预览评测-选择题',
					roles: ['admin'],
					icon: 'menu-trend',
				},
			},
			{
				path: '/preview-evaluation/trueOrFalseQuestions',
				name: 'previewTrueOrFalseQuestions',
				component: () => import('@/views/previewEvaluation/PreviewTrueOrFalseQuestions.vue'),
				meta: {
					title: '预览评测-判断题',
					roles: ['admin'],
					icon: 'menu-trend',
				},
			},
			{
				path: '/preview-evaluation/longTextQuestions',
				name: 'previewLongTextQuestions',
				component: () => import('@/views/previewEvaluation/PreviewLongTextQuestions.vue'),
				meta: {
					title: '预览评测-长文本',
					roles: ['admin'],
					icon: 'menu-trend',
				},
			},
			{
				path: '/response-evaluation/choiceQuestions',
				name: 'responseChoiceQuestions',
				component: () => import('@/views/responseEvaluation/ChoiceQuestions.vue'),
				meta: {
					title: '作答评测-选择题',
					roles: ['admin'],
					icon: 'menu-trend',
				},
			},
			{
				path: '/response-evaluation/trueOrFalseQuestions',
				name: 'responseTrueOrFalseQuestions',
				component: () => import('@/views/responseEvaluation/TrueOrFalseQuestions.vue'),
				meta: {
					title: '作答评测-判断题',
					roles: ['admin'],
					icon: 'menu-trend',
				},
			},
			{
				path: '/response-evaluation/longTextQuestions',
				name: 'responseLongTextQuestions',
				component: () => import('@/views/responseEvaluation/LongTextQuestions.vue'),
				meta: {
					title: '作答评测-长文本',
					roles: ['admin'],
					icon: 'menu-trend',
				},
			},
			{
				path: '/submit-successfully/index',
				name: 'submitSuccessfully',
				component: () => import('@/views/submitSuccessfully/index.vue'),
				meta: {
					title: '提交成功',
					roles: ['admin'],
					icon: 'menu-trend',
				},
			},
		],

	},
];
