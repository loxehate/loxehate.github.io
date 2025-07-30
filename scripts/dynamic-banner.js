hexo.extend.filter.register('theme_inject', function (injects) {
  injects.footer.raw('dynamic-banner', `
    <script>
      (function () {
        const banner = document.getElementById('banner');
        if (!banner) return;

        function updateBanner() {
          const isDark = document.documentElement.classList.contains('dark');
          const newImg = isDark ? '/img/dark.png' : '/img/light.jpg';
          banner.style.background = "url('" + newImg + "') center center / cover no-repeat";
        }

        // 初始设置
        document.addEventListener('DOMContentLoaded', updateBanner);

        // 监听主题切换
        const observer = new MutationObserver(updateBanner);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class']
        });
      })();
    </script>
  `);
});
