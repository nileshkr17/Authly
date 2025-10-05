import { User } from '@/types';

/**
 * Mock users for development and testing
 * These can be used when the backend is not available
 */
export const mockUsers: User[] = [
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    email: 'admin@authly.com',
    firstName: 'Admin',
    lastName: 'User',
    isEmailVerified: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
  },
  {
    id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    isEmailVerified: true,
    isActive: true,
    googleId: 'google-123456',
    createdAt: '2024-01-05T08:15:00.000Z',
    updatedAt: '2024-01-20T14:45:00.000Z',
  },
  {
    id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    isEmailVerified: true,
    isActive: true,
    githubId: 'github-789012',
    createdAt: '2024-01-10T12:00:00.000Z',
    updatedAt: '2024-01-22T09:20:00.000Z',
  },
  {
    id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
    email: 'bob.wilson@example.com',
    firstName: 'Bob',
    lastName: 'Wilson',
    isEmailVerified: false,
    isActive: true,
    createdAt: '2024-01-12T16:30:00.000Z',
    updatedAt: '2024-01-12T16:30:00.000Z',
  },
  {
    id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
    email: 'alice.brown@example.com',
    firstName: 'Alice',
    lastName: 'Brown',
    isEmailVerified: true,
    isActive: false,
    createdAt: '2024-01-08T11:45:00.000Z',
    updatedAt: '2024-01-18T13:10:00.000Z',
  },
];

/**
 * Mock authentication response
 */
export const mockAuthResponse = {
  access_token: 'mock-access-token-123456789',
  refresh_token: 'mock-refresh-token-987654321',
  user: mockUsers[0],
};

/**
 * Simulated API delay (in milliseconds)
 */
export const MOCK_API_DELAY = 500;

/**
 * Helper function to simulate async API call
 */
export const mockApiCall = <T>(data: T, delay: number = MOCK_API_DELAY): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

/**
 * Mock API error responses
 */
export const mockErrors = {
  unauthorized: {
    status: 401,
    message: 'Unauthorized',
  },
  notFound: {
    status: 404,
    message: 'Not found',
  },
  badRequest: {
    status: 400,
    message: 'Bad request',
  },
  serverError: {
    status: 500,
    message: 'Internal server error',
  },
};

/**
 * Example usage:
 * 
 * // In your component or API service:
 * import { mockUsers, mockApiCall } from '@/lib/mockData';
 * 
 * const getUsers = async () => {
 *   // Use mock data when backend is not available
 *   if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
 *     return mockApiCall(mockUsers);
 *   }
 *   // Otherwise, make real API call
 *   return apiService.getAllUsers();
 * };
 */
