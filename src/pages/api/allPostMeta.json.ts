import { getSortedPosts } from "@/utils/content-utils";
import { getPostUrlBySlug } from "@/utils/url-utils";

export async function GET(): Promise<Response> {
	const posts = await getSortedPosts();

	const allPostsData = posts
		.map((post) => ({
			id: post.id,
			url: getPostUrlBySlug(post.data.slug, post.data.published),
			title: post.data.title,
			description: post.data.description,
			published: post.data.published.getTime(),
			category: post.data.category || "",
			password: !!post.data.password,
		}))
		// 日历按纯日期排序，忽略置顶
		.sort((a, b) => b.published - a.published);

	return new Response(JSON.stringify(allPostsData));
}
