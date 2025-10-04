<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let { posts, userId } = $props<{
		posts: Array<{ id: number; title: string; userId: string }>;
		userId: string;
	}>();
</script>

<Card.Card>
	<Card.CardHeader>
		<Card.CardTitle>{userId}'s Posts</Card.CardTitle>
		<Card.CardDescription>getPostsByUserId('{userId}')</Card.CardDescription>
	</Card.CardHeader>
	<Card.CardContent>
		<ul class="space-y-1 text-sm">
			{#each posts as post}
				<li class="truncate">{post.title}</li>
			{/each}
		</ul>
	</Card.CardContent>
</Card.Card>
