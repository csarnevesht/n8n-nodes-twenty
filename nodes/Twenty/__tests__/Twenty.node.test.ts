import { IExecuteFunctions } from 'n8n-workflow';
import { Twenty } from '../Twenty.node';
import { twentyApiRequest } from '../GenericFunctions';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('../GenericFunctions');

const curlOutputDir = path.join(process.cwd(), 'test-output');
const curlOutputPath = path.join(curlOutputDir, 'twenty_api_curl_commands.txt');

// Ensure the output directory exists
if (!fs.existsSync(curlOutputDir)) {
  fs.mkdirSync(curlOutputDir, { recursive: true });
}

// Initialize the file with a header
fs.writeFileSync(curlOutputPath, '=== Twenty API Curl Commands ===\n\n');

function writeCurlCommand(operation: string, method: string, endpoint: string, body?: any, qs?: any) {
  const timestamp = new Date().toISOString();
  const curlCommand = `\n=== ${operation} (${timestamp}) ===\ncurl -X ${method} 'https://api.twenty.com${endpoint}' \\\n        -H 'Content-Type: application/json' \\\n        -d '${JSON.stringify(body, null, 2)}' \\\n${qs ? `        -d '${JSON.stringify(qs)}'\n` : '\n'}`;

  fs.appendFileSync(curlOutputPath, curlCommand);
  console.log(`Successfully wrote curl command for ${operation} to: ${curlOutputPath}`);
  console.log(curlCommand); // Also log to console for immediate feedback
}

// Function to read the curl commands file
function readCurlCommands() {
  if (fs.existsSync(curlOutputPath)) {
    return fs.readFileSync(curlOutputPath, 'utf8');
  }
  return 'File does not exist';
}

describe('Twenty Node', () => {
  let twenty: Twenty;
  let executeFunctions: jest.Mocked<IExecuteFunctions>;

  beforeEach(() => {
    twenty = new Twenty();
    executeFunctions = {
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        returnJsonArray: jest.fn().mockImplementation((items) => items),
        constructExecutionMetaData: jest.fn().mockImplementation((data) => [{json: data}]),
      },
      getNodeParameter: jest.fn(),
      getInputData: jest.fn().mockReturnValue([{}]),
      prepareOutputData: jest.fn().mockImplementation((items) => [items]),
      logger: {
        debug: jest.fn((message: string) => console.log(`[Twenty Node Debug] ${message}`)),
        info: jest.fn((message: string) => console.log(`[Twenty Node Info] ${message}`)),
        warn: jest.fn((message: string) => console.log(`[Twenty Node Warning] ${message}`)),
        error: jest.fn((message: string) => console.log(`[Twenty Node Error] ${message}`)),
        verbose: jest.fn((message: string) => console.log(`[Twenty Node Verbose] ${message}`)),
      },
    } as unknown as jest.Mocked<IExecuteFunctions>;
  });

  afterAll(() => {
    // Log the contents of the curl commands file
    console.log('\nCurl Commands File Contents:');
    console.log(readCurlCommands());
  });

  describe('createOnePerson operation', () => {
    it('should create a person with the provided data', async () => {
      const mockApiResponse = {
        data: {
          createPerson: {
            person: {
              id: '123',
              name: {
                firstName: 'John',
                lastName: 'Doe',
              },
              email: 'john@example.com',
              phone: '+1234567890',
              jobTitle: 'Developer',
              city: 'New York',
              avatarUrl: 'https://example.com/avatar.jpg',
            },
          },
        },
      };

      (twentyApiRequest as jest.Mock).mockResolvedValue(mockApiResponse);

      executeFunctions.getNodeParameter.mockImplementation((param) => {
        switch (param) {
          case 'resource':
            return 'person';
          case 'operation':
            return 'createOnePerson';
          case 'firstName':
            return 'John';
          case 'lastName':
            return 'Doe';
          case 'email':
            return 'john@example.com';
          case 'phone':
            return '+1234567890';
          case 'jobTitle':
            return 'Developer';
          case 'city':
            return 'New York';
          case 'avatarUrl':
            return 'https://example.com/avatar.jpg';
          default:
            return '';
        }
      });

      await twenty.execute.call(executeFunctions);

      const lastCall = (twentyApiRequest as jest.Mock).mock.lastCall;
      const [method, endpoint, requestBody, qs] = lastCall;

      // Log request details
      executeFunctions.logger.info(`Making request to Twenty API: ${method} ${endpoint}`);
      executeFunctions.logger.debug(`Request body: ${JSON.stringify(requestBody, null, 2)}`);
      if (qs && Object.keys(qs).length > 0) {
        executeFunctions.logger.debug(`Query parameters: ${JSON.stringify(qs, null, 2)}`);
      }

      // Log response
      executeFunctions.logger.debug(`Response: ${JSON.stringify(mockApiResponse, null, 2)}`);

      writeCurlCommand('createOnePerson', method, endpoint, requestBody, qs);

      expect(twentyApiRequest).toHaveBeenCalledWith(
        'POST',
        '/people',
        expect.any(Object),
        expect.any(Object),
      );

      expect(executeFunctions.prepareOutputData).toHaveBeenCalledWith([
        {
          json: {
            data: {
              createPerson: {
                person: mockApiResponse.data.createPerson.person,
              },
            },
          },
        },
      ]);
    });

    it('should handle missing required fields', async () => {
      const mockApiResponse = {
        data: {
          createPerson: {
            person: {
              id: '123',
              name: {
                firstName: '',
                lastName: '',
              },
            },
          },
        },
      };

      (twentyApiRequest as jest.Mock).mockResolvedValue(mockApiResponse);

      executeFunctions.getNodeParameter.mockImplementation((param) => {
        switch (param) {
          case 'resource':
            return 'person';
          case 'operation':
            return 'createOnePerson';
          default:
            return '';
        }
      });

      await twenty.execute.call(executeFunctions);

      const lastCall = (twentyApiRequest as jest.Mock).mock.lastCall;
      const [method, endpoint, requestBody, qs] = lastCall;

      // Log request details
      executeFunctions.logger.info(`Making request to Twenty API: ${method} ${endpoint}`);
      executeFunctions.logger.debug(`Request body: ${JSON.stringify(requestBody, null, 2)}`);
      if (qs && Object.keys(qs).length > 0) {
        executeFunctions.logger.debug(`Query parameters: ${JSON.stringify(qs, null, 2)}`);
      }

      // Log response
      executeFunctions.logger.debug(`Response: ${JSON.stringify(mockApiResponse, null, 2)}`);

      writeCurlCommand('createOnePerson', method, endpoint, requestBody, qs);

      expect(twentyApiRequest).toHaveBeenCalledWith(
        'POST',
        '/people',
        expect.any(Object),
        expect.any(Object),
      );

      expect(executeFunctions.prepareOutputData).toHaveBeenCalledWith([
        {
          json: {
            data: {
              createPerson: {
                person: mockApiResponse.data.createPerson.person,
              },
            },
          },
        },
      ]);
    });
  });
});
