hexo.extend.filter.register('theme_inject', function (injects) {
  injects.footer.raw('dynamic-banner', `
    <script>
      (function () {
        const banner = document.getElementById('banner');
        const toggleBtn = document.getElementById('color-toggle-icon');
        if (!banner || !toggleBtn) return;

        // 根据主题设置背景图
        function updateBannerByMode(mode) {
          const imgUrl = mode === 'dark' ? '/img/dark.png' : '/img/light.jpg';
          banner.style.background = "url('" + imgUrl + "') center center / cover no-repeat";
        }

        // 读取当前主题模式
        function getCurrentTheme() {
          const html = document.documentElement;
          return html.classList.contains('dark') ? 'dark' : 'light';
        }

        // 页面首次加载：设置背景图
        document.addEventListener('DOMContentLoaded', function () {
          const mode = getCurrentTheme();
          updateBannerByMode(mode);
        });

        // 拦截主题切换按钮点击
        toggleBtn.addEventListener('click', function () {
          // 切换主题 class（Fluid 默认通过 class 控制 dark/light）
          const html = document.documentElement;
          const isDark = html.classList.contains('dark');
          const newMode = isDark ? 'light' : 'dark';

          html.classList.remove(isDark ? 'dark' : 'light');
          html.classList.add(newMode);

          toggleBtn.setAttribute('data', newMode);
          updateBannerByMode(newMode);
        });
      })();
    </script>
  `);
});
