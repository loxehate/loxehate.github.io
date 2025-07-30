hexo.extend.filter.register('theme_inject', function (injects) {
  injects.footer.raw('banner-switch', `
    <script>
      (function () {
        function updateBanner() {
          const isDark = document.documentElement.classList.contains('dark');
          const banner = document.querySelector('.site-banner');
          if (!banner) return;
          banner.style.backgroundImage = isDark
            ? "url('/img/dark.png')"
            : "url('/img/light.jpg')";
        }

        // 切换模式后也切换 banner（Fluid 用的 classList 变换）
        const observer = new MutationObserver(updateBanner);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // 初始加载
        document.addEventListener('DOMContentLoaded', updateBanner);
      })();
    </script>
  `);
});
