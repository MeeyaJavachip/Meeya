(() => {
  const feed = document.querySelector("[data-feed]");
  const locations = new Set();
  if (!feed || !Array.isArray(window.HOWL_POSTS)) return;

  window.HOWL_POSTS.forEach((post) => {
    const article = document.createElement("article");
    article.className = "post";
    if (post.id) article.id = post.id;

    const byline = document.createElement("div");
    byline.className = "post-byline";

    const author = document.createElement("span");
    author.className = "post-author";
    author.textContent = post.author;
    byline.append(author);

    if (post.location) {
      const location = document.createElement("a");
      location.className = "post-location";
      location.href = `#${post.id || "places"}`;
      location.textContent = post.location;
      byline.append(location);
      locations.add(post.location);
    }

    const text = document.createElement("p");
    text.className = "post-text";
    text.textContent = post.text;
    article.append(byline, text);
    feed.append(article);
  });

  const placeList = document.querySelector("[data-places]");
  if (placeList) {
    [...locations].forEach((place) => {
      const matchingPost = window.HOWL_POSTS.find((post) => post.location === place && post.id);
      if (!matchingPost) return;
      const link = document.createElement("a");
      link.href = `#${matchingPost.id}`;
      link.textContent = place;
      placeList.append(link);
    });
  }
})();
