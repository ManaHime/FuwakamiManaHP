// Temporarily disabled - Google API integration
// All exports are stubs until Google API is re-enabled

type Credentials = any; // Temporary type until Google API is re-enabled

interface StreamData {
	streamData?: {
		items?: any[];
	};
}

// Stub exports to prevent "not a module" errors
export const getYouTubeByUserId = async (userId: string): Promise<null> => {
	return null;
};

export const getYouTubeExists = async (userId: string): Promise<boolean> => {
	return false;
};

export const setStreamUserData = async (
	userId: string,
	tokens: Credentials,
	streamData: any
): Promise<null> => {
	return null;
};

export const saveYouTubeToken = async (userId: string, tokens: Credentials): Promise<boolean> => {
	return false;
};

export const getAllStream = async (): Promise<StreamData[]> => {
	return [];
};

export const getAllStreamByUserId = async (userId: string): Promise<StreamData[]> => {
	return [];
};
