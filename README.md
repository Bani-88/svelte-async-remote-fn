# 🚀 SvelteKit Remote Functions - Interactive Showcase

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://svelte-async-remote-fn.vercel.app)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-5.0-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **✨ Now Stable!** Remote Functions officially launched in August 2025 with SvelteKit 2.27+

An interactive demonstration of **SvelteKit Remote Functions** patterns, showcasing type-safe client-server communication with live examples. Explore different async data loading patterns including queries, commands, and forms.

## 🎯 What are Remote Functions?

Remote Functions are SvelteKit's approach to **type-safe client-server communication**. They can be called anywhere in your app but always run on the server, making them perfect for:

- 🔒 Safely accessing server-only resources (environment variables, databases)
- 🎨 Writing full-stack features in a single file
- 🔄 Automatic data fetching and caching
- 📝 Progressive form enhancement
- ⚡ Built-in optimizations (batching, lazy discovery)

## 🎨 Live Patterns

This demo showcases **9 different patterns** for working with Remote Functions:

### 📊 Query Patterns

- **Top-level await** - Using `{#await query()}` directly in templates
- **Direct .current access** - Accessing `query().current` for manual control
- **Derived reactive queries** - Using `$derived()` for reactive data
- **Manual refresh** - Calling `.refresh()` on demand

### 🎬 Command Patterns

- **Command pattern** - Using `command()` for mutations and updates

### 📝 Form Patterns

- **Form pattern** - Progressive enhancement with `form()`

### 🛡️ Advanced Patterns

- **Error boundary** - Using `<svelte:boundary>` to catch errors
- **Dynamic import with await** - Lazy-loading components that use async data
- **Dynamic import (no # syntax)** - Testing `{await}` without hash symbol

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/wiesson/svelte-async-remote-fn.git
cd svelte-async-remote-fn

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173) to explore the patterns.

## 📖 Pattern Examples

### Query Pattern

```typescript
// src/routes/example.remote.ts
import { query } from '$app/server';
import { z } from 'zod';

export const getUser = query(z.object({ id: z.string() }), async ({ id }) => {
	return await db.user.findById(id);
});
```

```svelte
<!-- src/routes/example/+page.svelte -->
<script>
	import { getUser } from '../example.remote';

	let userQuery = getUser({ id: '123' });
</script>

{#if userQuery.loading}
	<p>Loading...</p>
{:else if userQuery.error}
	<p>Error: {userQuery.error.message}</p>
{:else if userQuery.current}
	<p>User: {userQuery.current.name}</p>
{/if}
```

### Command Pattern

```typescript
// For mutations and updates
export const updateUser = command(
	z.object({ id: z.string(), name: z.string() }),
	async ({ id, name }) => {
		return await db.user.update(id, { name });
	}
);
```

### Form Pattern

```typescript
// Progressive enhancement
export const contactForm = form(
	z.object({
		email: z.string().email(),
		message: z.string().min(10)
	}),
	async (data) => {
		await sendEmail(data);
		return { success: true };
	}
);
```

## 🛠️ Tech Stack

- **[SvelteKit 5](https://kit.svelte.dev)** - The fastest way to build Svelte apps
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn-svelte](https://shadcn-svelte.com)** - Beautiful UI components
- **[Lucide Icons](https://lucide.dev)** - Beautiful & consistent icons
- **[Zod](https://zod.dev)** - TypeScript-first schema validation

## 📚 Learn More

- 📖 [Official Remote Functions Documentation](https://svelte.dev/docs/kit/remote-functions)
- 💬 [SvelteKit Discussion #13897](https://github.com/sveltejs/kit/discussions/13897)
- 📰 [What's New in Svelte: August 2025](https://svelte.dev/blog/whats-new-in-svelte-august-2025)

## 🎨 Features

- ✅ **All major patterns** covered with live examples
- ✅ **Type-safe** end-to-end with TypeScript
- ✅ **Responsive design** with Tailwind CSS
- ✅ **Beautiful UI** using shadcn-svelte components
- ✅ **Toast notifications** for user feedback
- ✅ **Error handling** demonstrations
- ✅ **Progressive enhancement** examples

## 🤝 Contributing

Contributions are welcome! If you have ideas for additional patterns or improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-pattern`)
3. Commit your changes (`git commit -m 'Add amazing pattern'`)
4. Push to the branch (`git push origin feature/amazing-pattern`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- SvelteKit team for creating Remote Functions
- shadcn for the amazing component library
- The Svelte community for continuous inspiration

---

**[View Live Demo →](https://svelte-async-remote-fn.vercel.app)**

Made with ❤️ using SvelteKit
