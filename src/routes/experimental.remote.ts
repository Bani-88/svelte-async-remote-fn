import { query, command, form, getRequestEvent } from '$app/server';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

// Test query that delays 1.5s and returns current time
export const getDelayedTime = query(
	z.object({
		delay: z.number().default(1500)
	}),
	async ({ delay }) => {
		// Simulate delay
		await new Promise((resolve) => setTimeout(resolve, delay));

		return {
			timestamp: new Date().toISOString(),
			userId: 'demo-user',
			delay
		};
	}
);

// Test query that always throws an error (for error boundary testing)
export const getErrorQuery = query(z.object({}), async () => {
	// Simulate some delay before error
	await new Promise((resolve) => setTimeout(resolve, 500));

	throw error(500, 'This is a test error for boundary testing');
});

// Test command that updates a counter
export const incrementCounter = command(
	z.object({
		currentValue: z.number()
	}),
	async ({ currentValue }) => {
		// Simulate delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		return {
			newValue: currentValue + 1,
			timestamp: new Date().toISOString()
		};
	}
);

// Test form that echoes back the input with timestamp
export const testForm = form(
	z.object({
		message: z.string().min(1, 'Message is required'),
		count: z.coerce.number().default(0)
	}),
	async (data) => {
		// Simulate processing delay
		await new Promise((resolve) => setTimeout(resolve, 800));

		return {
			success: true,
			data: {
				message: data.message,
				count: data.count,
				timestamp: new Date().toISOString(),
				processedBy: 'demo-user'
			}
		};
	}
);
