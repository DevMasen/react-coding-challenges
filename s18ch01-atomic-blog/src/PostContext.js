import { createContext, useContext, useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';

// 1. Create a Context
const PostContext = createContext();

function createRandomPost() {
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
}

function PostProvider({ children }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [posts, setPosts] = useState(() =>
		Array.from({ length: 30 }, () => createRandomPost()),
	);
	// Derived state. These are the posts that will actually be displayed
	const searchedPosts =
		searchQuery.length > 0
			? posts.filter(post =>
					`${post.title} ${post.body}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
				)
			: posts;

	function handleAddPost(post) {
		setPosts(posts => [post, ...posts]);
	}

	function handleClearPosts() {
		setPosts([]);
	}

	const value = useMemo(
		function () {
			return {
				posts: searchedPosts,
				onAddPost: handleAddPost,
				onClearPosts: handleClearPosts,
				searchQuery,
				setSearchQuery,
			};
		},
		[searchQuery, searchedPosts],
	);

	return (
		// 2. Pass value to the Context Provider
		<PostContext.Provider value={value}>{children}</PostContext.Provider>
	);
}
function usePosts() {
	const context = useContext(PostContext);
	console.log(context);
	if (!context)
		throw new Error('PostsContext used outside of PostsProvider!');
	return context;
}

export { PostProvider, usePosts };
