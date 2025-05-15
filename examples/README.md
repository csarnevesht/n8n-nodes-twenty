# Twenty API Examples

This directory contains example scripts demonstrating how to use the Twenty API directly.

## Setup

1. Install dependencies:
```bash
npm install dotenv axios
```

2. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

3. Edit `.env` and add your Twenty API endpoint and API key.

## Examples

### Create Person

The `createPerson.js` example demonstrates how to create a new person in Twenty:

```bash
node createPerson.js
```

This will create a person with the following details:
- Name: John Doe
- Email: john@example.com
- Phone: +1234567890
- Job Title: Software Developer
- City: New York

The example shows:
- How to set up authentication with the API
- How to structure the person data
- How to handle API responses and errors

## API Documentation

For more information about the Twenty API, please refer to the official documentation. 
