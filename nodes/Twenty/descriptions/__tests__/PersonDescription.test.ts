import type {
  INodeProperties,
  INodePropertyOptions,
  INodePropertyCollection,
} from 'n8n-workflow';
import { personOperations, personFields } from '../PersonDescription';

describe('PersonDescription', () => {
  describe('personOperations', () => {
    it('should have createOnePerson operation', () => {
      const operations = personOperations[0] as INodeProperties;
      const createOnePersonOp = (operations.options as INodePropertyOptions[])?.find(
        (op) => op.value === 'createOnePerson'
      );

      expect(createOnePersonOp).toBeDefined();
      expect(createOnePersonOp?.name).toBe('Create One Person');
      expect(createOnePersonOp?.value).toBe('createOnePerson');
      expect(createOnePersonOp?.description).toContain('order_by');
      expect(createOnePersonOp?.description).toContain('filter');
      expect(createOnePersonOp?.description).toContain('limit');
      expect(createOnePersonOp?.description).toContain('depth');
    });
  });

  describe('personFields for createOnePerson', () => {
    const createOnePersonFields = personFields.filter((field: INodeProperties) =>
      field.displayOptions?.show?.operation?.includes('createOnePerson')
    );

    it('should have query field with depth option', () => {
      const queryField = createOnePersonFields.find((field) => field.name === 'query') as INodeProperties;
      expect(queryField).toBeDefined();
      expect(queryField?.type).toBe('collection');

      const depthOption = (queryField?.options as INodeProperties[])?.find(
        (opt) => opt.name === 'depth'
      );
      expect(depthOption).toBeDefined();
      expect(depthOption?.displayName).toBe('Depth');
      expect(depthOption?.type).toBe('options');
      expect(depthOption?.options).toEqual([
        { name: '0', value: '0' },
        { name: '1', value: '1' },
        { name: '2', value: '2' },
      ]);
      expect(depthOption?.default).toBe('1');
    });

    it('should have additionalFields with correct options', () => {
      const additionalFields = createOnePersonFields.find(
        (field) => field.name === 'additionalFields'
      ) as INodeProperties;
      expect(additionalFields).toBeDefined();
      expect(additionalFields?.type).toBe('collection');

      const options = additionalFields?.options as INodeProperties[] || [];
      expect(options).toContainEqual(
        expect.objectContaining({
          displayName: 'Avatar Url',
          name: 'avatarUrl',
          type: 'string',
          default: '',
        })
      );
      expect(options).toContainEqual(
        expect.objectContaining({
          displayName: 'City',
          name: 'city',
          type: 'string',
          default: '',
        })
      );
      expect(options).toContainEqual(
        expect.objectContaining({
          displayName: 'Job Title',
          name: 'jobTitle',
          type: 'string',
          default: '',
        })
      );
    });

    it('should have emails field with correct structure', () => {
      const additionalFields = createOnePersonFields.find(
        (field) => field.name === 'additionalFields'
      ) as INodeProperties;
      const emailsField = (additionalFields?.options as INodeProperties[])?.find(
        (opt) => opt.name === 'emails'
      );

      expect(emailsField).toBeDefined();
      expect(emailsField?.displayName).toBe('Emails');
      expect(emailsField?.type).toBe('fixedCollection');
      expect(emailsField?.default).toEqual({});

      const emailsFieldsCollection = emailsField?.options?.[0] as INodePropertyCollection;
      const emailsFieldsValues = emailsFieldsCollection?.values || [];
      expect(emailsFieldsValues).toContainEqual(
        expect.objectContaining({
          displayName: 'Primary Email',
          name: 'primaryEmail',
          type: 'string',
          default: '',
        })
      );
      expect(emailsFieldsValues).toContainEqual(
        expect.objectContaining({
          displayName: 'Additional Emails',
          name: 'additionalEmails',
          type: 'string',
          default: [],
          typeOptions: {
            multipleValues: true,
          },
        })
      );
    });

    it('should have name field with correct structure', () => {
      const additionalFields = createOnePersonFields.find(
        (field) => field.name === 'additionalFields'
      ) as INodeProperties;
      const nameField = (additionalFields?.options as INodeProperties[])?.find(
        (opt) => opt.name === 'name'
      );

      expect(nameField).toBeDefined();
      expect(nameField?.displayName).toBe('Name');
      expect(nameField?.type).toBe('fixedCollection');
      expect(nameField?.default).toEqual({});

      const nameFieldsCollection = nameField?.options?.[0] as INodePropertyCollection;
      const nameFieldsValues = nameFieldsCollection?.values || [];
      expect(nameFieldsValues).toContainEqual(
        expect.objectContaining({
          displayName: 'First Name',
          name: 'firstName',
          type: 'string',
          default: '',
        })
      );
      expect(nameFieldsValues).toContainEqual(
        expect.objectContaining({
          displayName: 'Last Name',
          name: 'lastName',
          type: 'string',
          default: '',
        })
      );
    });
  });
});
