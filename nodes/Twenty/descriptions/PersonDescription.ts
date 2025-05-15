import type {
	INodeProperties,
} from 'n8n-workflow';

export const personOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'person',
				],
			},
		},
		options: [
			{
				name: 'Create Many People',
				value: 'createManyPeople',
				action: 'Create many people',
			},
			{
				name: 'Create One Person',
				value: 'createOnePerson',
				description: '**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **people**',
				action: 'Create one person',
			},
			{
				name: 'Delete One Person',
				value: 'deleteOnePerson',
				description: '**depth** can be provided to request your **person**',
				action: 'Delete one person',
			},
			{
				name: 'Find Many People',
				value: 'findManyPeople',
				description: '**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **people**',
				action: 'Find many people',
			},
			{
				name: 'Find One Person',
				value: 'findOnePerson',
				description: '**depth** can be provided to request your **person**',
				action: 'Find one person',
			},
			{
				name: 'Find Person Duplicates',
				value: 'findPersonDuplicates',
				description: '**depth** can be provided to request your **person**',
				action: 'Find person duplicates',
			},
			{
				name: 'Update One Person',
				value: 'updateOnePerson',
				description: '**depth** can be provided to request your **person**',
				action: 'Update one person',
			},
		],
		default: 'createManyPeople',
	},
];

export const personFields: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'collection',
		placeholder: 'Add Query',
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['createOnePerson'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Depth',
				name: 'depth',
				type: 'options',
				options: [
					{ name: '0', value: '0' },
					{ name: '1', value: '1' },
					{ name: '2', value: '2' },
				],
				default: '1',
				description: 'Determines the level of nested related objects to include in the response.',
			},
		],
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['createOnePerson'],
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['createOnePerson'],
			},
		},
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['createOnePerson'],
			},
		},
	},
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['createOnePerson'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['createOnePerson'],
			},
		},
		options: [
			{
				displayName: 'Avatar URL',
				name: 'avatarUrl',
				type: 'string',
				default: '',
				description: 'Contact\'s avatar',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'Contact\'s city',
			},
			{
				displayName: 'Company ID',
				name: 'companyId',
				type: 'string',
				default: '',
				description: 'Contact\'s company ID foreign key',
			},
			{
				displayName: 'Job Title',
				name: 'jobTitle',
				type: 'string',
				default: '',
				description: 'Contact\'s job title',
			},
		],
	},
];
