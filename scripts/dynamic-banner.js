hexo.extend.filter.register('theme_inject', function (injects) {
  injects.footer.raw('dynamic-banner', `
    <script>
      (function () {
        const banner = document.getElementById('banner');
        const toggleBtn = document.getElementById('color-toggle-icon');
        if (!banner || !toggleBtn) return;

        function updateBannerByMode(mode) {
          const newImg = mode === 'dark' ? '/img/dark.png' : '/img/light.jpg';
          banner.style.background = "url('" + newImg + "') center center / cover no-repeat";
        }

        // 页面加载时判断初始 data 属性
        document.addEventListener('DOMContentLoaded', function () {
          const mode = toggleBtn.getAttribute('data');
          updateBannerByMode(mode);
        });

        // 点击切换按钮时修改 banner
        toggleBtn.addEventListener('click', function () {
          const current = toggleBtn.getAttribute('data');
          const newMode = current === 'dark' ? 'dark' : 'light';
          toggleBtn.setAttribute('data', newMode);
          updateBannerByMode(newMode);
        });
      })();
    </script>
  `);
});
