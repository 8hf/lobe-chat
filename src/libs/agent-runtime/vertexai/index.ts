import { VertexAI, VertexInit } from '@google-cloud/vertexai';

import { AgentRuntimeError, AgentRuntimeErrorType, LobeGoogleAI } from '@/libs/agent-runtime';

export class LobeVertexAI extends LobeGoogleAI {
  static initFromVertexAI(params?: VertexInit) {
    try {
      const client = new VertexAI({ location: 'us-central1', ...params });

      return new LobeGoogleAI({ apiKey: 'avoid-error', client });
    } catch (e) {
      const err = e as Error;

      if (err.name === 'IllegalArgumentError') {
        throw AgentRuntimeError.createError(AgentRuntimeErrorType.InvalidVertexCredentials, {
          message: err.message,
        });
      }

      throw e;
    }
  }
}
