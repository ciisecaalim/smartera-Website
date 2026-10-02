import type{BlogFilter,BlogPost}from"@/features/blogs/types/blogs.types";
const formatter=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"});
export const formatPublishedDate=(date:string)=>formatter.format(new Date(date.length===10?`${date}T00:00:00Z`:date));
export function filterBlogPosts(posts:BlogPost[],filter:BlogFilter){const q=filter.query.trim().toLowerCase();return posts.filter(post=>{const text=[post.title,post.excerpt,post.category,...post.tags].join(" ").toLowerCase();return(filter.category==="all"||post.category===filter.category)&&(!q||text.includes(q))})}
export function getRelatedPosts(current:BlogPost,posts:BlogPost[],limit=3){return posts.filter(post=>post.id!==current.id).map(post=>({post,score:Number(post.category===current.category)+post.tags.filter(tag=>current.tags.includes(tag)).length})).sort((a,b)=>b.score-a.score||b.post.publishedAt.localeCompare(a.post.publishedAt)).slice(0,limit).map(item=>item.post)}
