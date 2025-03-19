import sinon from 'sinon';
import * as undici from 'undici';
import { request } from 'undici';
import chai from 'chai';

import posts from '../../fixtures/posts';
/* eslint no-unused-vars: "off" */
const should = chai.should();

const base = 'http://localhost:1234';

describe('API', () => {
  let requestStub = null;

  beforeEach(() => {
    // Stub the undici request function
    requestStub = sinon.stub(undici, 'request');
  });

  afterEach(() => {
    // Restore the original function
    undici.request.restore();
  });

  describe('GET /api/v1/posts', () => {
    it('should return all posts', async () => {
      // Setup response mock for Undici
      const responseData = posts.all.success.body;

      // Create mock response to be returned by the stub
      const mockResponse = {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        },
        body: {
          json: async () => responseData
        }
      };

      // Configure stub to return the mock response
      requestStub.resolves(mockResponse);

      // Make the request
      const { statusCode, headers, body } = await request(
        `${base}/api/v1/post`
      );

      // Assertions
      statusCode.should.eql(200);
      headers['content-type'].should.contain('application/json');

      const responseBody = await body.json();
      responseBody.status.should.eql('success');
      responseBody.data.length.should.eql(2);
      responseBody.data[0].title.should.eql('title1');
    });
  });

  describe('GET /api/v1/post/:id', () => {
    it('should return a specific post', async () => {
      const obj = posts.single.success;

      const mockResponse = {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        },
        body: {
          json: async () => obj.body
        }
      };

      requestStub.resolves(mockResponse);

      const { statusCode, headers, body } = await request(
        `${base}/api/v1/posts/5fb1ad6afb45c431a842c394`
      );

      statusCode.should.equal(200);
      headers['content-type'].should.contain('application/json');

      const responseBody = await body.json();
      responseBody.status.should.eql('success');
      responseBody.data[0].title.should.eql('title1');
    });

    it('should throw an error if the post does not exist', async () => {
      const obj = posts.single.failure;

      const mockResponse = {
        statusCode: 404,
        headers: {
          'content-type': 'application/json'
        },
        body: {
          json: async () => obj.body
        }
      };

      requestStub.resolves(mockResponse);

      const { statusCode, headers, body } = await request(
        `${base}/api/v1/posts/5fb1ad6afb45c431a842c666`
      );

      statusCode.should.equal(404);
      headers['content-type'].should.contain('application/json');

      const responseBody = await body.json();
      responseBody.status.should.eql('error');
      responseBody.message.should.eql('That post does not exist.');
    });
  });

  describe('POST /api/v1/posts', () => {
    it('should return the post that was added', async () => {
      const requestData = {
        isPublished: false,
        title: 'title3',
        description: 'description3',
        createdAt: '2020-11-15T22:36:26.566Z',
        userId: '5fb1ac21fb45c431a842c393'
      };

      const obj = posts.add.success;

      const mockResponse = {
        statusCode: 201,
        headers: {
          'content-type': 'application/json'
        },
        body: {
          json: async () => obj.body
        }
      };

      requestStub.resolves(mockResponse);

      const { statusCode, headers, body } = await request(
        `${base}/api/v1/posts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        }
      );

      statusCode.should.equal(201);
      headers['content-type'].should.contain('application/json');

      const responseBody = await body.json();
      responseBody.status.should.eql('success');
      responseBody.data[0].title.should.eql('title3');
    });
  });

  describe('PUT /api/v1/posts', () => {
    it('should return the post that was updated', async () => {
      const requestData = {
        description: 'description3updated'
      };

      const obj = posts.update.success;

      const mockResponse = {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        },
        body: {
          json: async () => obj.body
        }
      };

      requestStub.resolves(mockResponse);

      const { statusCode, headers, body } = await request(
        `${base}/api/v1/posts/5fb1ad6afb45c431a842c000`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        }
      );

      statusCode.should.equal(200);
      headers['content-type'].should.contain('application/json');

      const responseBody = await body.json();
      responseBody.status.should.eql('success');
      responseBody.data[0].description.should.eql('description3updated');
    });
  });
});
