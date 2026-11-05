(() => {
  const feed = document.querySelector("[data-feed]");
  const places = document.querySelector("[data-places]");
  const knownLocations = new Set();
  const posts = window.HOWL_POSTS;

  if (!feed || !Array.isArray(posts)) return;

  posts.forEach((post, index) => {
    const article = document.createElement("article");
    article.className = "post";
    const postId = post.id || `post-${index + 1}`;
    article.id = postId;

    const byline = document.createElement("div");
    byline.className = "post-byline";

    const author = document.createElement("span");
    author.className = "post-author";
    author.textContent = post.author;
    byline.append(author);

    if (post.location) {
      const location = document.createElement("a");
      location.className = "post-location";
      location.href = `#${postId}`;
      location.textContent = post.location;
      byline.append(location);
      knownLocations.add(post.location);
    }

    const text = document.createElement("p");
    text.className = "post-text";
    text.textContent = post.text;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.className = "post-action like-action";
    like.type = "button";
    like.setAttribute("aria-pressed", "false");
    like.textContent = "Like";
    like.addEventListener("click", () => {
      const isLiked = like.getAttribute("aria-pressed") !== "true";
      like.setAttribute("aria-pressed", String(isLiked));
      like.textContent = isLiked ? "Liked" : "Like";
    });

    const share = document.createElement("button");
    share.className = "post-action share-action";
    share.type = "button";
    share.textContent = "Share";

    const feedback = document.createElement("p");
    feedback.className = "post-feedback";
    feedback.setAttribute("aria-live", "polite");
    feedback.setAttribute("aria-atomic", "true");

    share.addEventListener("click", async () => {
      const postUrl = new URL(`#${postId}`, window.location.href).href;
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard access is unavailable.");
        await navigator.clipboard.writeText(postUrl);
        feedback.textContent = "Post link copied.";
      } catch {
        const link = document.createElement("a");
        link.href = postUrl;
        link.textContent = "Open post link";
        feedback.replaceChildren(document.createTextNode("Copy unavailable: "), link);
      }
    });

    actions.append(like, share);
    article.append(byline, text, actions, feedback);
    feed.append(article);
  });

  if (places) {
    [...knownLocations].forEach((location) => {
      const matchingPost = posts.find((post) => post.location === location && post.id);
      if (!matchingPost) return;
      const link = document.createElement("a");
      link.href = `#${matchingPost.id}`;
      link.textContent = location;
      places.append(link);
    });
  }
})();
