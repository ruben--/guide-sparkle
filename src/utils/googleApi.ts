// Helper function to extract document ID from Google Docs URL
export const extractDocId = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

// Initialize Google API client
export const initializeGoogleApi = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.gapi !== 'undefined') {
      window.gapi.load('client', async () => {
        try {
          await window.gapi.client.init({
            apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
            clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/documents.readonly',
            discoveryDocs: ['https://docs.googleapis.com/$discovery/rest?version=v1'],
          });
          resolve(true);
        } catch (error) {
          console.error('Error initializing Google API:', error);
          reject(error);
        }
      });
    } else {
      reject(new Error('Google API not loaded'));
    }
  });
};

// Fetch document content from Google Docs
export const fetchGoogleDocContent = async (docId: string) => {
  try {
    const response = await window.gapi.client.docs.documents.get({
      documentId: docId
    });

    let content = "";
    if (response.result.body?.content) {
      content = response.result.body.content.reduce((text: string, element: any) => {
        if (element.paragraph) {
          element.paragraph.elements.forEach((el: any) => {
            if (el.textRun && el.textRun.content) {
              text += el.textRun.content;
            }
          });
        }
        return text;
      }, "");
    }
    return content;
  } catch (error) {
    throw error;
  }
};