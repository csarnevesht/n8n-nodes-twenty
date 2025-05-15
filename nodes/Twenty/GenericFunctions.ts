import {
	IDataObject,
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

export async function twentyApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	path: string = '/graphql',
) {
	const credentials = await this.getCredentials('twentyApi');

	if (credentials === undefined) {
		throw new NodeOperationError(this.getNode(), 'No credentials returned!');
	}

	// For GraphQL, we always use POST
	const options: IRequestOptions = {
		method: 'POST',
		body: {
			query: `
				mutation CreatePerson($data: PersonCreateInput!) {
					createPerson(data: $data) {
						id
						createdAt
						updatedAt
						deletedAt
						name {
							firstName
							lastName
						}
						emails {
							primaryEmail
							additionalEmails
						}
						phones {
							primaryPhoneNumber
							primaryPhoneCountryCode
							primaryPhoneCallingCode
							additionalPhones
						}
						city
						jobTitle
						linkedinLink {
							primaryLinkLabel
							primaryLinkUrl
							secondaryLinks
						}
						xLink {
							primaryLinkLabel
							primaryLinkUrl
							secondaryLinks
						}
						avatarUrl
						createdBy {
							source
							name
							workspaceMemberId
							context
						}
					}
				}
			`,
			variables: {
				data: body,
			},
		},
		uri: `${credentials.domain}${path}`,
		json: true,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		return await this.helpers.requestWithAuthentication.call(this, 'twentyApi', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}
