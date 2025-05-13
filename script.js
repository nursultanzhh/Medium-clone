document.addEventListener('DOMContentLoaded', async () => {
  const postsContainer = document.getElementById('postsContainer');
  const postContainer = document.getElementById('postContainer');

  if (postsContainer) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();

      posts.slice(0, 3).forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.style.cursor = 'pointer';
        postElement.addEventListener('click', () => {
          window.location.href = `post.html?post=${post.id}`;
        });

        postElement.innerHTML = `
          <div class="post-content">
            <div class="meta"> 
              <img src="author1.png" alt="author" />
              Authors name in Topics Name • 7 July
            </div>
            <div class="title">${post.title}</div>
            <div class="description">${post.body}</div>
            <div class="tags">
              <span class="tag">JavaScript</span>
              <span>12 min read</span>
              <span>• Selected for you</span>
            </div>
          </div>
          <div class="post-image">
            <img src="img${(post.id)}.png" alt="Post image">
          </div>
        `;

        postsContainer.appendChild(postElement);
      });
    } catch (error) {
      postsContainer.innerHTML = 'Owibka zagruski.';
      console.error('Ошибка:', error);
    }
  }

  if (postContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');

    if (postId) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!response.ok) throw new Error('Пост не найден');
        const post = await response.json();

        postContainer.innerHTML = `
          <div class="medium">
            <header>medium alike</header>
          </div>
          <div class="back-button">
            <button id="backtoposts">←</button>
          </div>
          <div class="top-bar">
            <img src="author2.png" alt="Author">
            <div class="author-info">
              <div class="Authorsname"><strong>Author #${post.userId}</strong></div>
              <div class="date">7 July · 12 min read · Member-only</div>
            </div>
            <div class="logo">
              <img src="linkedin.png">
              <img src="facebook.png">
              <img src="twitter.png">
            </div>
          </div>
          <h1>Practical CSS Tips</h1>
          <div class="subtitle">How product designers can break from the status quo and help our planet</div>
          <img src="img4.png" class="main-image" alt="Article Image">
          <h2>Subheader</h2>
          <p>How long are you awake in the morning before you go online? Perhaps it’s while you’re still lying in bed, using a news feed or social media as the needed stimulant to push you out from under the covers. Or maybe you wait to open your device until after a warm shower and cup of coffee. If you use sleep tracking apps, you might say you never signed off in the first place.</p>
          <div class="footer-icons">
            <div>
              <span>❤️180</span>
              <span>💬12</span>
            </div>
            <div>
              <span>🔖</span>
            </div>
          </div>
        `;
      } catch (error) {
        postContainer.innerHTML = 'Ошибка загрузки поста.';
        console.error('Ошибка:', error);
      }
    } else {
      postContainer.innerHTML = 'ID поста не указан.';
    }
  }
});
