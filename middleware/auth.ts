export default defineNuxtRouteMiddleware(({ params }, from) => {
  if (params.chapterSlug === "1-chapter-1") {
    return;
  }
  return navigateTo("/login");
});
