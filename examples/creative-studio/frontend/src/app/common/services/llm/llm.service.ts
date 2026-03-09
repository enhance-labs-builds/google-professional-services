/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {environment} from '../../../../environments/environment';

interface LlmGenerateContentRequest {
  prompt: string;
  system_instruction?: string;
  response_mime_type?: string;
}

interface LlmGenerateContentResponse {
  text: string;
}

/**
 * Thin HTTP client for calling the backend LLM proxy endpoint.
 * Auth header is added automatically by the existing AuthInterceptor.
 */
@Injectable({
  providedIn: 'root',
})
export class LlmService {
  private readonly apiUrl = `${environment.backendURL}/llm/generate-content`;

  constructor(private http: HttpClient) {}

  /**
   * Sends a prompt to the backend LLM proxy and returns the generated text.
   */
  generateContent(
    prompt: string,
    systemInstruction?: string,
    responseMimeType?: string,
  ): Observable<string> {
    const body: LlmGenerateContentRequest = {
      prompt,
      system_instruction: systemInstruction,
      response_mime_type: responseMimeType,
    };
    return this.http
      .post<LlmGenerateContentResponse>(this.apiUrl, body)
      .pipe(map(response => response.text));
  }
}
