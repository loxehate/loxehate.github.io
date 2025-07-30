hexo.extend.filter.register('theme_inject', function (injects) {
  injects.footer.raw('banner-switch', `
    <script>
      (function () {
        const bannerSelector = '.site-banner'; // Fluid 默认 banner class

        function setBannerImage() {
          const isDark = document.documentElement.classList.contains('dark');
          const banner = document.querySelector(bannerSelector);
          if (!banner) return;

          const img = isDark ? '/img/dark.png' : '/img/light.jpg';
          banner.style.backgroundImage = 'url(' + img + ')';
          banner.style.backgroundSize = 'cover';
          banner.style.backgroundPosition = 'center';
        }

        // 初始加载
        document.addEventListener('DOMContentLoaded', setBannerImage);

        // 监听 class 变化（响应主题切换）
        const observer = new MutationObserver(setBannerImage);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class']
        });
      })();
    </script>
  `);
});
