interface Window {
  gapi: {
    load(
      apiName: string,
      callback: () => void
    ): void;
    client: {
      init(config: {
        apiKey: string;
        clientId: string;
        scope: string;
        discoveryDocs: string[];
      }): Promise<void>;
      docs: {
        documents: {
          get(params: { documentId: string }): Promise<{
            result: {
              body?: {
                content: Array<{
                  paragraph?: {
                    elements: Array<{
                      textRun?: {
                        content: string;
                      };
                    }>;
                  };
                }>;
              };
            };
          }>;
        };
      };
    };
    auth2: {
      getAuthInstance(): {
        isSignedIn: {
          get(): boolean;
        };
        signIn(): Promise<void>;
      };
    };
  };
}