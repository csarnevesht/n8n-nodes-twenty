import type {
	IDataObject,
	INodeExecutionData,
	IExecuteFunctions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { twentyApiRequest } from './GenericFunctions';

import {
	generalFields,
	generalOperations,
	apiKeyFields,
	apiKeyOperations,
	attachmentFields,
	attachmentOperations,
	auditLogFields,
	auditLogOperations,
	blocklistFields,
	blocklistOperations,
	calendarChannelFields,
	calendarChannelOperations,
	calendarChannelEventAssociationFields,
	calendarChannelEventAssociationOperations,
	calendarEventFields,
	calendarEventOperations,
	calendarEventParticipantFields,
	calendarEventParticipantOperations,
	companyFields,
	companyOperations,
	connectedAccountFields,
	connectedAccountOperations,
	favoriteFields,
	favoriteOperations,
	favoriteFolderFields,
	favoriteFolderOperations,
	messageFields,
	messageOperations,
	messageChannelFields,
	messageChannelOperations,
	messageChannelMessageAssociationFields,
	messageChannelMessageAssociationOperations,
	messageParticipantFields,
	messageParticipantOperations,
	messageThreadFields,
	messageThreadOperations,
	noteFields,
	noteOperations,
	noteTargetFields,
	noteTargetOperations,
	opportunityFields,
	opportunityOperations,
	personFields,
	personOperations,
	taskFields,
	taskOperations,
	taskTargetFields,
	taskTargetOperations,
	timelineActivityFields,
	timelineActivityOperations,
	viewFields,
	viewOperations,
	viewFieldFields,
	viewFieldOperations,
	viewFilterFields,
	viewFilterOperations,
	viewFilterGroupFields,
	viewFilterGroupOperations,
	viewGroupFields,
	viewGroupOperations,
	viewSortFields,
	viewSortOperations,
	webhookFields,
	webhookOperations,
	workflowFields,
	workflowOperations,
	workflowEventListenerFields,
	workflowEventListenerOperations,
	workflowRunFields,
	workflowRunOperations,
	workflowVersionFields,
	workflowVersionOperations,
	workspaceMemberFields,
	workspaceMemberOperations,
} from './descriptions';

export class Twenty implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Twenty',
		name: 'twenty',
		icon: 'file:twenty.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume the Twenty API',
		defaults: {
			name: 'Twenty',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'twentyApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Api Key',
						value: 'apiKey',
					},
					{
						name: 'Attachment',
						value: 'attachment',
					},
					{
						name: 'Audit Log',
						value: 'auditLog',
					},
					{
						name: 'Blocklist',
						value: 'blocklist',
					},
					{
						name: 'Calendar Channel',
						value: 'calendarChannel',
					},
					{
						name: 'Calendar Channel Event Association',
						value: 'calendarChannelEventAssociation',
					},
					{
						name: 'Calendar Event',
						value: 'calendarEvent',
					},
					{
						name: 'Calendar Event Participant',
						value: 'calendarEventParticipant',
					},
					{
						name: 'Company',
						value: 'company',
					},
					{
						name: 'Connected Account',
						value: 'connectedAccount',
					},
					{
						name: 'Favorite',
						value: 'favorite',
					},
					{
						name: 'General',
						value: 'general',
					},
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Message Channel',
						value: 'messageChannel',
					},
					{
						name: 'Message Channel Message Association',
						value: 'messageChannelMessageAssociation',
					},
					{
						name: 'Message Participant',
						value: 'messageParticipant',
					},
					{
						name: 'Message Thread',
						value: 'messageThread',
					},
					{
						name: 'Note',
						value: 'note',
					},
					{
						name: 'Note Target',
						value: 'noteTarget',
					},
					{
						name: 'Opportunity',
						value: 'opportunity',
					},
					{
						name: 'Person',
						value: 'person',
					},
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Task Target',
						value: 'taskTarget',
					},
					{
						name: 'Timeline Activity',
						value: 'timelineActivity',
					},
					{
						name: 'View',
						value: 'view',
					},
					{
						name: 'View Field',
						value: 'viewField',
					},
					{
						name: 'View Filter',
						value: 'viewFilter',
					},
					{
						name: 'View Filter Group',
						value: 'viewFilterGroup',
					},
					{
						name: 'View Group',
						value: 'viewGroup',
					},
					{
						name: 'View Sort',
						value: 'viewSort',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
					{
						name: 'Workspace Member',
						value: 'workspaceMember',
					},
				],
				default: 'general',
			},
						...generalOperations,
			...generalFields,
			...apiKeyOperations,
			...apiKeyFields,
			...attachmentOperations,
			...attachmentFields,
			...auditLogOperations,
			...auditLogFields,
			...blocklistOperations,
			...blocklistFields,
			...calendarChannelOperations,
			...calendarChannelFields,
			...calendarChannelEventAssociationOperations,
			...calendarChannelEventAssociationFields,
			...calendarEventOperations,
			...calendarEventFields,
			...calendarEventParticipantOperations,
			...calendarEventParticipantFields,
			...companyOperations,
			...companyFields,
			...connectedAccountOperations,
			...connectedAccountFields,
			...favoriteOperations,
			...favoriteFields,
			...favoriteFolderOperations,
			...favoriteFolderFields,
			...messageOperations,
			...messageFields,
			...messageChannelOperations,
			...messageChannelFields,
			...messageChannelMessageAssociationOperations,
			...messageChannelMessageAssociationFields,
			...messageParticipantOperations,
			...messageParticipantFields,
			...messageThreadOperations,
			...messageThreadFields,
			...noteOperations,
			...noteFields,
			...noteTargetOperations,
			...noteTargetFields,
			...opportunityOperations,
			...opportunityFields,
			...personOperations,
			...personFields,
			...taskOperations,
			...taskFields,
			...taskTargetOperations,
			...taskTargetFields,
			...timelineActivityOperations,
			...timelineActivityFields,
			...viewOperations,
			...viewFields,
			...viewFieldOperations,
			...viewFieldFields,
			...viewFilterOperations,
			...viewFilterFields,
			...viewFilterGroupOperations,
			...viewFilterGroupFields,
			...viewGroupOperations,
			...viewGroupFields,
			...viewSortOperations,
			...viewSortFields,
			...webhookOperations,
			...webhookFields,
			...workflowOperations,
			...workflowFields,
			...workflowEventListenerOperations,
			...workflowEventListenerFields,
			...workflowRunOperations,
			...workflowRunFields,
			...workflowVersionOperations,
			...workflowVersionFields,
			...workspaceMemberOperations,
			...workspaceMemberFields,
		],
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let responseData;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'person') {
					if (operation === 'createOnePerson') {
						// Get required fields
						const firstName = this.getNodeParameter('firstName', i) as string;
						const lastName = this.getNodeParameter('lastName', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

						// Get additional fields
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						// Construct the body
						const body = {
							name: {
								firstName,
								lastName,
							},
							emails: {
								primaryEmail: email,
							},
							phones: {
								primaryPhoneNumber: phoneNumber,
								primaryPhoneCountryCode: 'US',
								primaryPhoneCallingCode: '1',
							},
						} as IDataObject;

						// Add additional fields if provided
						if (additionalFields.city) {
							body.city = additionalFields.city;
						}
						if (additionalFields.jobTitle) {
							body.jobTitle = additionalFields.jobTitle;
						}
						if (additionalFields.avatarUrl) {
							body.avatarUrl = additionalFields.avatarUrl;
						}
						if (additionalFields.companyId) {
							body.companyId = additionalFields.companyId;
						}

						responseData = await twentyApiRequest.call(this, 'POST', '', body);

						if (responseData.data && responseData.data.createPerson) {
							responseData = responseData.data.createPerson;
						}
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData);
				} else if (responseData !== null) {
					returnData.push({ json: responseData });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}
		return [returnData];
	}
}
